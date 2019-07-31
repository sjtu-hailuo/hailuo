const { PitchSystem } = require('./pitch');
const { YIN, PYinMain } = require('./YIN');
const { Constants, Utils } = require('./utils');

const audioData = require('./data');
//Utils.arrayWindowing(audioData, 'rectangle');
//console.log(audioData);

let [prevT, curT] = [0, 0];
let pym = new PYinMain(new PitchSystem());
let yin = new YIN();

prevT = new Date().getTime();
for (let i = 0; i + 4096 < audioData.length; i+=64) {
//for (let i = 740 * 64; i < 747 * 64; i+=64) {
  let curData = Utils.arrayWindowing(audioData.slice(i, i+4096), 'rectangle');

  let res1 = pym.process(curData);
  let res2 = yin.absoluteYin(curData);
  if (res1 === null) { res1 = 100; }
  if (res2 === null) { res2 = 100; }
  console.log(res1.toFixed(2), res2.toFixed(2), (res1 - res2).toFixed(2));
}
curT = new Date().getTime();
console.log('timecost: ', curT-prevT);
