import Base, { blockWrapper }  from './base';

const regEx = /^([^\n]+)\n(={2,}|-{2,})(?:\n|$)/;

class Headline2 extends Base {
  async createObject(input: string): blockWrapper {
    const matches = input.match(regEx);
    if (matches !== null) {
      const level = matches[2][0] === '=' ? 1 : 2;
      const text = matches[1];
      return [input.substring(matches[0].length), {
        type: 'headline',
        level,
        text,
      }]
    } else {
      return undefined;
    }
  }
}

export default Headline2;
