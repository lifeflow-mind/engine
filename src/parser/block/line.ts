import Base, { blockWrapper }  from './base';

const regEx = /^([^\n]*)(?:\n|$)/;

class Line extends Base {
  async createObject(input: string): blockWrapper {
    const matches = input.match(regEx);
    if (matches !== null) {
      const text = matches[1];
      return [input.substring(matches[0].length), {
        type: 'line',
        text,
      }]
    }
  }
}

export default Line;
