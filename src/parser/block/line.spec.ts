import Parser from './line';
import { expect } from 'chai';

describe('parser', () => {
  describe('block', () => {
    describe('headline 2', () => {
      let parser: Parser;

      beforeEach(() => {
        parser = new Parser();
      });

      it('should be able to read a line', async () => {
        const output = await parser.createObject(`
Hello World
====
this is a test
        `.trim());
        expect(output).to.be.eql(['====\nthis is a test', {
          type: 'line',
          text: 'Hello World',
        }]);
      })
    })
  })
})
