class Constants {
  static sampleRate = 44100;
  static hopSize = 4096;
  static bufferSize = 4096;
};

var secToQuarterNote = (sec, tempo) => sec * tempo / 60;
var quarterNoteToSec = (quarterNote, tempo) => quarterNote * 60 / tempo;

export { Constants, secToQuarterNote, quarterNoteToSec };
