class Gradient {

  // 'rgba(68,136,148,1)' index = 0.5
  constructor(startColor = [34,45,240], endColor = [104,229,56]) {
    this.startColor = startColor;
    this.endColor = endColor;
  }

  toRGBA(index, A = 1) {
    if (index < 0 || index > 1) {
      throw 'Gradient index out of range [0, 1].';
    }
    let resColor = [0,0,0];
    for (let i = 0; i < 3; i++) {
      resColor[i] = Math.round(this.startColor[i] * (1 - index) + this.endColor[i] * index);
      resColor[i] = Math.min(Math.max(resColor[i], 0), 255)
    }
    return `rgba(${resColor[0]},${resColor[1]},${resColor[2]},${A})`;
  }

};

export default Gradient;
