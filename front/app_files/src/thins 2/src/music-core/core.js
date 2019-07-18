import {
  DeviceEventEmitter
} from 'react-native';
//import AutoTracking from './auto-tracking';
import { Sheet } from './sheet';
import { Constants, Utils } from './utils';
import { NoteDeviation } from './note';

class Core {

  constructor() {
    this.sheet = new Sheet();

    this.sheetNameListener = DeviceEventEmitter.addListener('sheetName', (sheetName) => {
      this.sheet.resetBySheetName(sheetName);
      this.reset();
    });
    this.practiceRangeListener = DeviceEventEmitter.addListener('practiceRange', (practiceRange) => {
      this.sheet.setPracticeRange(practiceRange);
    });
    this.tempoListener = DeviceEventEmitter.addListener('tempo', (tempo) => {
      this.tempo = tempo;
    });

    this.reset();
  }

  reset() {
    this.tempo = this.sheet.defaultTempo;
    this.matchedInterval = [0, 0];
    this.noteDeviation = [];
    for (let i = 0; i < this.sheet.nNotes; i++) {
      this.noteDeviation.push(new NoteDeviation());
    }
    // this.autoTracker
  }

}

export default Core;
