class Constants {
  static maxNum = 0x7fffffff;

  static sampleRate = 44100;
  static bufferSize = 4096;
  static hopSize = 1024;
  static hopTime = Constants.hopSize / Constants.sampleRate; // in sec

  // Delay for higher accuracy in HMM
  static pitchDetectionDelay = 0.1; // in sec
  static nHopsPitchDetectionDelay =
    Math.floor(Constants.pitchDetectionDelay / Constants.hopTime);
};

class WindowsFuncs {

  static rectangle = n => 1;

  static triangle = (n, N) => 1 - Math.abs((2 * n - N) / (N + 2));

  static parzen = (n, N) => {
    const omega0 = (n) => {
      const L = N + 1, hL = L / 2;
      return Math.abs(n) < L / 4 ?
        1 - 6 * (n / hL) ** 2 * (1 - Math.abs(n) / hL) :
        2 * (1 - Math.abs(n) / hL) ** 3;
    }
    return omega0(n - N / 2);
  }

  static welch = (n, N) => 1 - ((2 * n - N) / N) ** 2;

  static sine = (n, N) => Math.sin(Math.PI * n / N);

  static hann = (n, N) => Math.sin(Math.PI * n / N) ** 2;

  static hamming = (n, N, alpha0 = 0.53836) =>
    alpha0 - (1 - alpha0) * Math.cos(2 * Math.PI * n / N);

  static blackman = (n, N, alpha = 0.16) => {
    const alpha0 = (1 - alpha) / 2,
          alpha1 = 1 / 2,
          alpha2 = alpha / 2;
    return alpha0 -
      alpha1 * Math.cos(2 * Math.PI * n / N) +
      alpha2 * Math.cos(4 * Math.PI * n / N);
  }

  static blackmanharris = (n, N, alpha = [0.35875, 0.48829, 0.14128, 0.01168]) =>
    alpha[0] - alpha[1] *  Math.cos(2 * Math.PI * n / N) +
    alpha[2] * Math.cos(4 * Math.PI * n / N) -
    alpha[3] * Math.cos(6 * Math.PI * n / N);
}

class Utils {
  static secToQuarterNote = (sec, tempo) => sec * tempo / 60;
  static quarterNoteToSec = (quarterNote, tempo) => quarterNote * 60 / tempo;

  static arrayNormalize(arr) {
    let sumArr = 0;
    arr.forEach(val => sumArr += val);
    arr.forEach((val, i) => arr[i] /= sumArr);
    return arr;
  }

  static arrayMultiply(arr1, arr2) {
    const len = arr1.length;
    for (let i = 0; i < arr1.length; i++) {
      arr1[i] *= arr2[i];
    }
    return arr1;
  }

  static genWindowByFunc(len, func, normalized = false) {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(func(i, len-1));
    }
    return normalized ? Utils.arrayNormalize(arr) : arr;
  }

  static genWindow(len, method, normalized = false) {
    return Utils.genWindowByFunc(len, WindowsFuncs[method], normalized);
  }

  static arrayWindowingByFunc(arr, func) {
    return Utils.arrayMultiply(arr, Utils.genWindowByFunc(arr.length, func, true));
  }

  static arrayWindowing(arr, method) {
    return Utils.arrayMultiply(arr, Utils.genWindow(arr.length, method, true));
  }

}

module.exports = { Constants, Utils };
