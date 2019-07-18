"use strict";

let xml2js = require("xml2js");
import Note from './note';
import Pitch from './pitch';

let xmlParser = new xml2js.Parser({
  tagNameProcessors: [
    xml2js.processors.stripPrefix,
    xml2js.processors.firstCharLowerCase
  ]
});

const stepNumber = {
  'C' : 0,
  'D' : 2,
  'E' : 4,
  'F' : 5,
  'G' : 7,
  'A' : 9,
  'B' : 11,
};

var getFlattenedNotesFromScore = (xml) => {
  let flattenedNotes = [];

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
        if (measure.attributes) {
          if (measure.attributes[0].divisions) {
            divisions = Number(measure.attributes[0].divisions[0]);
          }
        }

        const notes = measure.note;
        if (!notes) { return; }
        notes.forEach((note) => {
          const pitchN = note.pitch
              ? stepNumber[note.pitch[0].step[0]]
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

const tempSheet = [
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

class Sheet {
  constructor(notes = tempSheet) {
    this.notes = notes;
    this.duration = notes[notes.length - 1].offset;
  }

  pitchAtLoc(loc) {
    let [l, r] = [0, this.notes.length];
    if (loc < 0 || loc >= this.duration) {
      throw `loc ${loc} is out of the range [${this.left}, ${this.right})`;
    }
    while (l + 1 < r) {
      const mid = Math.floor((l + r) / 2);
      if (this.notes[mid].onset <= loc ) {
        l = mid;
      } else {
        r = mid;
      }
    }
    return this.notes[l].pitch;
  }

  findNextNonRestLoc(loc, step) {
    let [l, r] = [0, this.notes.length];
    if (Math.abs(step) !== 1) {
      throw `step ${step} must be 1 or -1.`;
    }
    if (loc < 0 || loc > this.duration) {
      throw `loc ${loc} is out of the range [${this.left}, ${this.right}).`;
    }
    while (l + 1 < r) {
      const mid = Math.floor((l + r) / 2);
      if (this.notes[mid].onset <= loc ) {
        l = mid;
      } else {
        r = mid;
      }
    }
    for (; this.notes[l].isRest; l += step);
    return this.notes[l][step == 1 ? 'onset' : 'offset'];
  }
}

export { getFlattenedNotesFromScore, Sheet };
