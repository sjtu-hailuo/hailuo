console.log('################################################################################');
console.log();
console.log('################################################################################');

const { Constants, Utils } = require('../utils');
const { SheetParser, Sheet, Record } = require('../sheet');
const { Note, NoteDeviation } = require('../note');
const NoteMatcher = require('../note-matching');

let matchedInterval = [ 0.2, 5 ];
const sheetNotes = [
  new Note(60, 3),
  new Note(62, 2),
], recordNotes = [
  new Note(60, 2),
  new Note(62, 3),
];
SheetParser.addOnsetsToNotes(sheetNotes);
SheetParser.addOnsetsToNotes(recordNotes);

let sheet = new Sheet(sheetNotes);
let record = new Record(80);
record.lenHop = 0.5;
let noteDeviation = [];
for (let i = 0; i < sheet.nNotes; i++) {
  noteDeviation.push(new NoteDeviation());
}

let nm = new NoteMatcher(sheet, record, noteDeviation);

//const testData = require('./dataAT');
//testData.forEach((data) => record.append(data));
recordNotes.forEach((note) => {
  for (let i = 0; i < Math.round(note.duration / record.lenHop); i++) {
    record.append(note.pitch);
  }
});

nm.updateNoteDeviation(record.length - 1, matchedInterval);

//console.log(matchedInterval);
/*
sheet.notes.forEach((note, i) => {
  console.log(note.toString());
  console.log(noteDeviation[i]);
  console.log(note.withDeviation(noteDeviation[i]).toString());
  console.log();
});
*/
