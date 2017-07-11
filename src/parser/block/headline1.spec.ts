import Parser from './headline1';
import { expect } from 'chai';

describe('parser', () => {
  describe('block', () => {
    describe('headline 1', () => {
      let parser: Parser;

      beforeEach(() => {
        parser = new Parser();
      });

      it('should parse a level 1 title', async () => {
        const output = await parser.createObject(`
# Hello World
this is a test
        `.trim());
        expect(output).to.be.eql(['this is a test', {
          type: 'headline',
          level: 1,
          text: 'Hello World',
        }]);
      })

      it('should parse a level 2 title', async () => {
        const output = await parser.createObject(`
## Hello World
this is a test
        `.trim());
        expect(output).to.be.eql(['this is a test', {
          type: 'headline',
          level: 2,
          text: 'Hello World',
        }]);
      });

      it('should not parse non title', async () => {
        const output = await parser.createObject(`
Hello World
this is a test
        `.trim());
        expect(output).to.be.eql(undefined);
      })
    })
  })
})
