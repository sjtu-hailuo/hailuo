const { Sheet, Record } = require('../sheet');

let a = new Record(60);
a.append(50);
a.append(60);
a.append(70);
console.log(a.pitches);
console.log(a.nNonRestPitches);
console.log(a.sumPitches);
console.log(a.averagePitch(1,1));
