const { Pitch } = require('./pitch');

class Note {
  constructor(pitch, duration, onset) {
    this.pitch = pitch;
    this.duration = duration;
    this.onset = onset;
  }

  get offset () {
    return this.onset + this.duration;
  }

  get isRest() {
    return Pitch.isRest(this.pitch);
  }

  get isValid() {
    return Pitch.isValid(this.pitch);
  }

  toString() {
    return `< Note ${Pitch.repr(this.pitch)} with ` +
      `on=${this.onset.toFixed(2)} ` +
      `off=${this.offset.toFixed(2)} >`;
  }

  withDeviation(noteDeviation) {
    return new Note(
      this.pitch + noteDeviation.dPitch,
      this.duration + this.duration * (noteDeviation.dOffset - noteDeviation.dOnset),
      this.onset + this.duration * noteDeviation.dOnset,
    );
  }
}

class NoteDeviation {

  constructor(dPitch = 0, dOnset = 0, dOffset = 0) {
    this.dPitch = dPitch;
    this.dOnset = dOnset;
    this.dOffset = dOffset;
  }

}

module.exports = { Note, NoteDeviation };
