const { Constants, Utils } = require('./utils');
const { Pitch } = require('./pitch');

const BINS_PER_SEMITONE = 5,
      LOWEST_PITCH = 28,    // E1
      HIGHEST_PITCH = 96,   // C7
      //LOWEST_PITCH = 58,    // Bb3
      //HIGHEST_PITCH = 70,   // Bb4
      NSEMITONES = HIGHEST_PITCH - LOWEST_PITCH,
      NBINS = NSEMITONES * BINS_PER_SEMITONE,
      HMM_SIZE = 2 * NBINS,
      TRANS_WIDTH = 5 * Math.floor(BINS_PER_SEMITONE / 2) + 1, //(BINS_PER_SEMITONE & 1),
      YIN_TRUST = 0.5,
      SELF_TRANS = 0.99,
      VITERBI_SIZE = Constants.nHopsPitchDetectionDelay;

class PitchHMM {

  constructor(pitchSystem) {
    this.pitchSystem = pitchSystem;
    this.build();
    this.binFreq = new Array(HMM_SIZE);
    for (let i = 0; i < NBINS; i++) {
      this.binFreq[i] = this.pitchSystem.toFreq(i / BINS_PER_SEMITONE + LOWEST_PITCH);
      this.binFreq[i + NBINS] = - this.binFreq[i];
    }
    // console.log(this.binFreq);

    this.prevDelta = this.initial;
    this.count = 0;
    this.fromState = [];
    for (let i = 0; i < VITERBI_SIZE; i++) {
      this.fromState.push(new Array(HMM_SIZE).fill(0));
    }
  }

  build() {
    this.initial = new Array(HMM_SIZE).fill(1 / HMM_SIZE);

    this.transition = [];
    const transWindow = Utils.genWindow(TRANS_WIDTH, 'triangle');
    for (let i = 0; i < NBINS; i++) {
      const halfTransWidth = Math.floor(TRANS_WIDTH / 2),
            minNextPitch = Math.max(i - halfTransWidth, 0),
            maxNextPitch = Math.min(i + halfTransWidth, NBINS - 1);
      const weights = Utils.arrayNormalize(transWindow.slice(
          minNextPitch - i + halfTransWidth,
          maxNextPitch - i + halfTransWidth + 1
      ));
      for (let j = minNextPitch; j <= maxNextPitch; j++) {
        const curProb1 = weights[j - minNextPitch] * SELF_TRANS,
              curProb2 = weights[j - minNextPitch] * (1 - SELF_TRANS);
        this.transition.push([i, j, curProb1]);
        this.transition.push([i, j + NBINS, curProb2]);
        this.transition.push([i + NBINS, j, curProb2]);
        this.transition.push([i + NBINS, j + NBINS, curProb1]);
      }
    }
    // console.log(this.transition);

    // emission is a identital matrix which can be omitted.
  }

  calcObsProb(freqProb) {
    let obsProb = new Array(HMM_SIZE).fill(0),
        probYinPitched = 0;
    freqProb.forEach(([freq, prob]) => {
      obsProb[
        Math.round(Pitch.freqDist(freq, this.binFreq[0]) * BINS_PER_SEMITONE)
      ] = prob * YIN_TRUST;
      probYinPitched += prob;
    });

    for (let i = 0; i < NBINS; i++) {
      obsProb[i + NBINS] = (1 - probYinPitched) / NBINS;
    }

    // console.log(freqProb);
    // console.log(obsProb);
    return obsProb;
  }

  viterbiAppend(obsProb) {
    let delta = new Array(HMM_SIZE).fill(0);
    for (let t = 0, tSize = this.transition.length; t < tSize; t++) {
      const [i, j, prob] = this.transition[t],
            curValue = this.prevDelta[i] * prob;
      if (curValue > delta[j]) {
        delta[j] = curValue;
        this.fromState[this.count % VITERBI_SIZE][j] = i;
      }
    }

    for (let i = 0; i < HMM_SIZE; i++) {
      delta[i] *= obsProb[i];
    }

    this.prevDelta = Utils.arrayNormalize(delta);
    // console.log(this.prevDelta);
    this.count += 1;
  }

  viterbiBackward() {
    if (this.count < VITERBI_SIZE) {
      return null;
    }
    let bestValue = 0, resBin = null;
    for (let i = 0; i < HMM_SIZE; i++) {
      if (this.prevDelta[i] > bestValue) {
        bestValue = this.prevDelta[i];
        resBin = i;
      }
    }
    if (resBin === null) {
      return null;
    }
    for (let i = 0; i < VITERBI_SIZE; i++) {
      resBin = this.fromState[(this.count - i) % VITERBI_SIZE][resBin];
    }

    return this.binFreq[resBin];
  }

  streamlineFreqProbs(freqProb) {
    let sumProb = 0, sumStreamlinedProb =0;
    freqProb.forEach(([freq, prob]) => {
      sumProb += prob;
      if (this.binFreq[0] <= freq && freq <= this.binFreq[NBINS - 1]) {
        sumStreamlinedProb += prob;
      }
    });

    let streamlinedFreqProbs = [];
    freqProb.forEach(([freq, prob]) => {
      if (this.binFreq[0] <= freq && freq <= this.binFreq[NBINS - 1]) {
        streamlinedFreqProbs.push([freq, prob * sumProb / sumStreamlinedProb]);
      }
    });
    // console.log(freqProb, streamlinedFreqProbs);
    return streamlinedFreqProbs;
  }

  append(freqProb) {
    freqProb = this.streamlineFreqProbs(freqProb);
    this.viterbiAppend(this.calcObsProb(freqProb));
    const binFreq = this.viterbiBackward();
    if (binFreq === null) {
      return null;
    }
    let minDist = 1 / BINS_PER_SEMITONE,
        resFreq = null;
    freqProb.forEach(([freq, prob]) => {
      const dist = Math.abs(Pitch.freqDist(freq, binFreq));
      if (dist < minDist) {
        minDist = dist;
        resFreq = freq;
      }
    });
    return resFreq;
  }

};

module.exports = PitchHMM;
