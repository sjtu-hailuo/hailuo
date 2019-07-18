class Pitch {

  static restName = 'Rest';
  static noteNames = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];
  static validMidiRange = [12, 108];

  static isValid(val) {
    return Pitch.validMidiRange[0] <= val && val <= Pitch.validMidiRange[1]
  }

  static isRest(val) {
    return !Pitch.isValid(val);
  }

  static rounded(val) {
    return Math.round(val);
  }

  static step(val) {
    const roundedMidi = Pitch.rounded(val);
    return roundedMidi === 0 ? Pitch.restName :
      `${Pitch.noteNames[roundedMidi % 12]}`;
  }

  static octave(val) {
    const roundedMidi = Pitch.rounded(val);
    return roundedMidi === 0 ? Pitch.restName :
      `${Math.floor(roundedMidi / 12) - 1}`;
  }

  static name(val) {
    const roundedMidi = Pitch.rounded(val);
    return roundedMidi === 0 ? Pitch.restName :
      `${Pitch.noteNames[roundedMidi % 12]}${Math.floor(roundedMidi / 12) - 1}`;
  }

  static error(val) {
    return val - Math.round(val);
  }

  static errorRepr(val, errFixed = 2) {
    let err = Pitch.error(val).toFixed(errFixed);
    return `${err >= 0 ? '+' : ''}${(err * 10 ** errFixed).toFixed(0)}`;
  }

  static repr(val, errorFixed = 2) {
    curName = Pitch.name(val);
    return `${curName}${curName == Pitch.restName ? '' : Pitch.errorRepr(val, errorFixed)}`;
  }

  static calcDiff(p1, p2, dSilent = 0) {
    if (p1 == p2) {
      return 0;
    } else if (p1 == 0 || p2 == 0) {
      return dSilent;
    } else if (Math.abs(Math.abs(p1 - p2) - 12) < 1 ) {
      return (p1 - p2) + ((p1 > p2) ? -12 : 12);
    } else {
      return p1 - p2;
    }
  }
};

class PitchSystem {

    constructor(freq = 440, midi = 69) {
      this.fA4 = freq * 2 ** ((69 - midi) / 12);
    }

    toMidi(freq) {
  		return freq == null ? 0 : 69 + 12 * Math.log2(freq / this.fA4);
    }

    toFreq(midi) {
  		return this.fA4 * 2 ** ((midi - 69) / 12);
    }

    /*
    static restName = 'Rest';
    static noteNames = [
      'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];

    static midiRounded(val) {
      return Math.round(val);
    }

    midiRoundedFromFreq(val) {
      return Math.round(this.freqToMidi(val));
    }

    static midiLetter(val) {
      const roundedMidi = Pitch.midiRounded(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Pitch.noteNames[roundedMidi % 12]}`;
    }

    midiLetterFromFreq() {
      const roundedMidi = this.midiRoundedFromFreq(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Pitch.noteNames[roundedMidi % 12]}`;
    }

    static midiOctave(val) {
      const roundedMidi = Pitch.midiRounded(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Math.floor(roundedMidi / 12) - 1}`;
    }

    midiOctaveFromFreq(val) {
      const roundedMidi = this.midiRoundedFromFreq(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Math.floor(roundedMidi / 12) - 1}`;
    }

    static midiName(val) {
      const roundedMidi = Pitch.midiRounded(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Pitch.noteNames[roundedMidi % 12]}${Math.floor(roundedMidi / 12) - 1}`;
    }

    midiNameFromFreq(val) {
      const roundedMidi = this.midiRoundedFromFreq(val);
      return roundedMidi === 0 ? Pitch.restName :
        `${Pitch.noteNames[roundedMidi % 12]}${Math.floor(roundedMidi / 12) - 1}`;
    }

    static error(val) {
      return val - Math.round(val);
    }

    errorFromFreq(val) {
      let midi = this.freqToMidi(val);
      return midi - Math.round(midi);
    }

    errorRepr(val, from = 'midi') {
      let err = this.error(val, from).toFixed(this.errFixed);
      return `${err >= 0 ? '+' : ''}${(err * 10 ** this.errFixed).toFixed(0)}`;
    }

    midiRepr(val, from = 'midi') {
      curName = this.midiName(val, from);
      return `${curName}${curName == Pitch.restName ? '' : this.errorRepr(val, from)}`;
    }
    */
}

export { Pitch, PitchSystem };
