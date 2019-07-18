import { Pitch } from './pitch';

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
    return '';
  }
}

export default Note;
