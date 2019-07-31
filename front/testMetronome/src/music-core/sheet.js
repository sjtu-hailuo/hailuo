"use strict";

const xml2js = require("xml2js");
const { Note } = require('./note');
const { Pitch } = require('./pitch');
const { Constants, Utils } = require('./utils');

class SheetParser {

  static getFlattenedNotesFromScore(xml) {
    let flattenedNotes = [];
    let xmlParser = new xml2js.Parser({
      tagNameProcessors: [
        xml2js.processors.stripPrefix,
        xml2js.processors.firstCharLowerCase
      ]
    });

    xmlParser.parseString(xml, (err, result) => {
      const score = result["score-partwise"];
      if (!score) { return; }
      const parts = score.part;
      if (!parts) { return; }
      let divisions = 0, onset = 0;

      parts.forEach((part) => {
        const measures = part.measure;
        if (!measures) { return; }

        measures.forEach((measure) => {
          if (measure.attributes && measure.attributes[0].divisions) {
            divisions = Number(measure.attributes[0].divisions[0]);
          }

          const notes = measure.note;
          if (!notes) { return; }
          notes.forEach((note) => {
            const pitchN = note.pitch
                ? Pitch.stepNumber[note.pitch[0].step[0]]
                  + 12 * (Number(note.pitch[0].octave[0]) + 1)
                  + (note.pitch[0].alter ? Number(note.pitch[0].alter[0]) : 0)
                : 0;
            const duration = Number(note.duration[0]) / divisions;
            flattenedNotes.push(new Note(pitchN, duration, onset));
            console.log(`new Note(${pitchN}, ${duration}, ${onset}),`);
            // broken due to cannot access the file via iOS-RNFS,
            // so use the log to get the data --- tempSheet
            onset += duration;
          });
        });
      });
    });

    return flattenedNotes;
  };

  static addOnsetsToNotes(notes) {
    let onset = 0;
    notes.forEach((note, i) => {
      notes[i].onset = onset;
      onset += notes[i].duration;
    });
    return notes;
  }

  static tempSheet = [
    new Note(0, 2, 0),
    new Note(0, 1, 2),
    new Note(47, 0.5, 3),
    new Note(49, 0.5, 3.5),
    new Note(50, 1, 4),
    new Note(49, 1, 5),
    new Note(47, 1, 6),
    new Note(47, 0.5, 7),
    new Note(49, 0.5, 7.5),
    new Note(50, 1, 8),
    new Note(49, 1, 9),
    new Note(47, 1, 10),
    new Note(54, 1, 11),
    new Note(52, 1, 12),
    new Note(50, 1, 13),
    new Note(49, 1, 14),
    new Note(49, 1, 15),
    new Note(50, 1, 16),
    new Note(50, 1, 17),
    new Note(52, 1, 18),
    new Note(52, 1, 19),
    new Note(54, 1, 20),
    new Note(54, 1, 21),
    new Note(52, 1, 22),
    new Note(50, 1, 23),
    new Note(49, 2, 24),
    new Note(47, 1, 26),
    new Note(0, 3, 27),
  ];
}

class Sheet {
  constructor(notes = SheetParser.tempSheet) {
    this.notes = notes;
    this.notes.push(new Note(0, 0, this.notes[this.notes.length - 1].offset));
    this.duration = notes[notes.length - 1].offset;
    this.defaultTempo = 80;
    this.setPracticeRange([0, this.duration]);
  }

  get nNotes() {
    return this.notes.length;
  }

  resetSheet(sheet){
    var notes = [];
    for(var i=0;i<sheet.length;i++){
      var tmpNote = new Note(sheet[i].pitch,sheet[i].duration,sheet[i].onset);
      notes.push(tmpNote);
    }
    this.notes = notes;
    this.notes.push(new Note(0, 0, this.notes[this.notes.length - 1].offset));
    this.duration = notes[notes.length - 1].offset;
    this.defaultTempo = 80;
    this.setPracticeRange([0, this.duration]);
  }

  refineRange() {
    this.practiceRange[0] = this.findNextNonRestLoc(this.practiceRange[0], 1);
    this.practiceRange[1] = this.findNextNonRestLoc(this.practiceRange[1], -1);
  }

  setPracticeRange(newPracticeRange) {
    this.practiceRange = newPracticeRange;
    this.refineRange();
  }

  indexAtLoc(loc) {
    if (loc < 0 || loc > this.duration) {
      throw `loc ${loc} is out of the range [${this.left}, ${this.right})`;
    }

    let [l, r] = [0, this.notes.length];
    while (l + 1 < r) {
      const mid = Math.floor((l + r) / 2);
      if (this.notes[mid].onset <= loc ) {
        l = mid;
      } else {
        r = mid;
      }
    }
    return l;
  }

  pitchAtLoc(loc) {
    return this.notes[this.indexAtLoc(loc)].pitch;
  }

  findNextNonRestLoc(loc, step) {
    let i = this.indexAtLoc(loc);
    for (; i < this.notes.length && this.notes[i].isRest; i += step);
    return this.notes[i][step == 1 ? 'onset' : 'offset'];
  }
};

class Record {

  constructor(tempo) {
    this.reset(tempo);
  }

  reset(tempo) {
    this.pitches = [];
    this.sumPitches = [0];
    this.nNonRestPitches = [0];
    if (tempo) {
      this.tempo = tempo;
      this.lenHop = Utils.secToQuarterNote(Constants.hopTime, this.tempo);
    }
  }

  get length() {
    return this.pitches.length;
  }

  append(newPitch) {
    const lRecord = this.pitches.push(newPitch);
    this.sumPitches.push(this.sumPitches[lRecord - 1] + newPitch);
    this.nNonRestPitches.push(this.nNonRestPitches[lRecord - 1] + (Pitch.isValid(newPitch) ? 1 : 0));
    return lRecord;
  }

  averagePitch(left, right) {
    // [left, right)
    if (left < 0 || right > this.pitches.length || right < left) {
      throw `ValueError [${left}, ${right})`;
    } else if (this.nNonRestPitches[right] === this.nNonRestPitches[left]) {
      return 0;
    }
    return (this.sumPitches[right] - this.sumPitches[left]) /
      (this.nNonRestPitches[right] - this.nNonRestPitches[left]);
  }

};

module.exports = { SheetParser, Sheet, Record };
