import Parser from './code';
import { expect } from 'chai';
import Runtime from '../../runtime';
import spawner from '../../runtime/node-spawner';

describe('parser', () => {
  describe('block', () => {
    describe('code', () => {
      let parser: Parser;
      let runtime: Runtime;

      beforeEach(() => {
        parser = new Parser();
        runtime = new Runtime(spawner);
      });

      it('should be able to parse script', async () => {
        const output = await parser.createObject(`
\`\`\`javascript
Hello World
\`\`\`

this is a test
        `.trim(), runtime);
        expect(output).to.be.eql(['\n\nthis is a test', {
          type: 'code',
          source: 'Hello World',
          language: 'javascript',
          settings: {},
          module: false,
          output: undefined,
        }]);
      });

      it('should be able to parse script without language', async () => {
        const output = await parser.createObject(`
\`\`\`
Hello World
\`\`\`

this is a test
        `.trim(), runtime);
        expect(output).to.be.eql(['\n\nthis is a test', {
          type: 'code',
          source: 'Hello World',
          language: undefined,
          settings: {},
          module: false,
          output: undefined,
        }]);
      })

      it('should be able to parse javascript settings', async () => {
        const output = await parser.createObject(`
\`\`\`javascript
//: module
//: name = something
Hello World
\`\`\`

this is a test
        `.trim(), runtime);

        expect(output).to.be.eql(['\n\nthis is a test', {
          type: 'code',
          source: 'Hello World',
          language: 'javascript',
          settings: {
            module: true,
            name: 'something',
          },
          module: true,
          output: undefined,
        }]);
      });

      it('should be able to generate output', async () => {
        console.log('test');
        const output = await parser.createObject(`
\`\`\`typescript
//: output
module.exports = 'hello world'
\`\`\`

this is a test
        `.trim(), runtime);

        expect(output).to.be.eql(['\n\nthis is a test', {
          type: 'code',
          source: 'module.exports = \'hello world\'',
          language: 'typescript',
          settings: {
            output: true,
          },
          module: false,
          output: 'hello world',
        }]);
      })
    })
  })
})
