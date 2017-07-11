import Base, { blockWrapper }  from './base';

const regEx = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/;

class Headline1 extends Base {
  async createObject(input: string): blockWrapper {
    const matches = input.match(regEx);
    if (matches !== null) {
      const level = matches[1].length;
      const text = matches[2].trim();
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

export default Headline1;
