const { Constants, Utils } = require('../utils');
const AutoTracker = require('../auto-tracking');
const { Sheet, Record } = require('../sheet');

let record = new Record(80);
let at = new AutoTracker(new Sheet(), record);

let genData = (sheet, range) => {
  let res = [];
  for (let i = range[0]; i < range[1]; i += at.lenHop) {
    res.push(sheet.pitchAtLoc(i) + Math.random() * 3 - 1.5);
  }
  return res;
}

console.log(at.sheet.notes);

//const testData = genData(at.sheet, [3, 11]).concat(genData(at.sheet, [7, 27]));
const testData = require('./dataAT');

testData.forEach((data, i) => {
  const curPitchIndex = record.append(data) - 1;
  const curRes = at.getMatchedInterval(curPitchIndex);
  console.log(data, curRes);
  console.log();
});
