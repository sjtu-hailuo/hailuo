import {
  DeviceEventEmitter
} from 'react-native';
import AutoTracker from './auto-tracking';
import NoteMatcher from './note-matching';
import { Sheet, Record } from './sheet';
import { Constants, Utils } from './utils';
import { NoteDeviation } from './note';

class Core {

  constructor() {
    this.sheet = new Sheet();
    this.record = new Record(this.sheet.defaultTempo);
    this.reset();

    // this.sheetNameListener = DeviceEventEmitter.addListener('sheetName', (sheetName) => {
    //   this.sheet.resetBySheetName(sheetName);
    //   this.reset();
    // });
    this.practiceRangeListener = DeviceEventEmitter.addListener('practiceRange', (practiceRange) => {
      this.sheet.setPracticeRange(practiceRange);
      this.resetModules();
    });
    this.tempoListener = DeviceEventEmitter.addListener('tempo', (tempo) => {
      this.tempo = tempo;
      this.resetModules();
    });
    this.pitchMidiListener = DeviceEventEmitter.addListener('pitchMidi', (data) => {
      this.mainProcess(data);
    });
  }

  reset() {
    this.tempo = this.sheet.defaultTempo;
    this.matchedInterval = [0, 0];
    this.noteDeviation = [];
    for (let i = 0; i < this.sheet.nNotes; i++) {
      this.noteDeviation.push(new NoteDeviation());
    }

    this.record.reset(this.tempo);
    this.autoTracker = new AutoTracker(this.sheet, this.record);
    this.noteMatcher = new NoteMatcher(this.sheet, this.record, this.noteDeviation);
  }

  resetBySheetName(sheetData){
    this.sheet.resetSheet(sheetData)
  }

  resetModules() {
    this.record.reset(this.tempo);
    this.autoTracker.reset();
    this.noteMatcher.reset();
  }

  terminate() {
    this.sheetNameListener.remove();
    this.practiceRange.remove();
    this.tempoListener.remove();
    this.pitchMidiListener.remove();
  }

  mainProcess(newPitchMidi) {
    const newPitchIndex = this.record.append(newPitchMidi) - 1;
    const curMatchedInterval = this.autoTracker.getMatchedInterval(newPitchIndex);

    if (!curMatchedInterval) { return; }

    if (this.noteMatcher.updateNoteDeviation(newPitchIndex, curMatchedInterval)) {
      this.matchedInterval = curMatchedInterval;
      DeviceEventEmitter.emit('rerenderPlz', 'LOL');
    };
  }

};

export default Core;
