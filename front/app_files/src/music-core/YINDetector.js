"use strict";

module.exports = function YINDetector(
  float32AudioBuffer,
  threshold = 0.1,
  sampleRate = 44100,
  probabilityThreshold = 0.1,
  bufferSize = 4096,
) {
  let yinBufferLength = bufferSize / 2;
  let yinBuffer = new Float32Array(yinBufferLength);
  let probability = void 0,
      tau = void 0;

  for (let t = 0; t < yinBufferLength; t++) {
    yinBuffer[t] = 0;
  }
  for (let _t = 1; _t < yinBufferLength; _t++) {
    for (let i = 0; i < yinBufferLength; i++) {
      let delta = float32AudioBuffer[i] - float32AudioBuffer[i + _t];
      yinBuffer[_t] += delta * delta;
    }
  }

  yinBuffer[0] = 1;
  yinBuffer[1] = 1;
  let runningSum = 0;
  for (let _t2 = 1; _t2 < yinBufferLength; _t2++) {
    runningSum += yinBuffer[_t2];
    yinBuffer[_t2] *= _t2 / runningSum;
  }

  for (tau = 2; tau < yinBufferLength; tau++) {
    if (yinBuffer[tau] < threshold) {
      for (; tau + 1 < yinBufferLength && yinBuffer[tau + 1] < yinBuffer[tau]; tau++);
      probability = 1 - yinBuffer[tau];
      break;
    }
  }

  if (
    tau == yinBufferLength ||
    yinBuffer[tau] >= threshold ||
    probability < probabilityThreshold
  ) {
    return null;
  }

  let betterTau = 0;
  let x0 = tau < 1 ? tau : tau - 1;
  let x2 = tau + 1 < yinBufferLength ? tau + 1 : tau;
  if (x0 === tau) {
    betterTau = yinBuffer[tau] <= yinBuffer[x2] ? tau : x2;
  } else if (x2 === tau) {
    betterTau = yinBuffer[tau] <= yinBuffer[x0] ? tau : x0;
  } else {
    let s0 = yinBuffer[x0];
    let s1 = yinBuffer[tau];
    let s2 = yinBuffer[x2];
    betterTau = tau + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
  }

  return sampleRate / betterTau;
};
