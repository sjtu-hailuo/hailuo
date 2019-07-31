console.log('################################################################################');
console.log();
console.log('################################################################################');

const { Constants, Utils } = require('../utils');
const { SheetParser, Sheet, Record } = require('../sheet');
const { Note, NoteDeviation } = require('../note');
const NoteMatcher = require('../note-matching');

let sheet = new Sheet();
let record = new Record(80);
let noteDeviation = [];
for (let i = 0; i < sheet.nNotes; i++) {
  noteDeviation.push(new NoteDeviation());
}

let nm = new NoteMatcher(sheet, record, noteDeviation);

const testData = require('./dataAT');
testData.forEach((data) => record.append(data));

let matchedInterval = [ 3.681118669690096, 11.173424036281164 ];
nm.updateNoteDeviation(record.length - 1, matchedInterval);

//console.log('lenHop = ', record.lenHop);
//console.log(matchedInterval);


sheet.notes.forEach((note, i) => {
  console.log(noteDeviation[i]);
  console.log(note.toString());
  console.log(note.withDeviation(noteDeviation[i]).toString());
  console.log();
});
