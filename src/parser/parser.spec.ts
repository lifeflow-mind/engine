import parser from './index';
import { expect } from 'chai';
import Runtime from '../runtime';
import spawner from '../runtime/node-spawner';

describe('parser', () => {
  it('should be able to parse a document', async () => {
    const runtime = new Runtime(spawner);
    const document = `
# Hello world

this is a test

document
-----

with

\`\`\`javascript
//: output
//: module
let aLittleBitOf = 'Everythin';
module.exports = document.here;
document.there = document.here;
\`\`\`

in it
    `;

    const documentData: any = {
      here: 'test',
    };

    const result = await parser(document, runtime, documentData);
    expect(result.blocks).to.be.eql([
      { type: 'headline', level: 1, text: 'Hello world' },
      { type: 'line', text: 'this is a test' },
      { type: 'line', text: '' },
      { type: 'headline', level: 2, text: 'document' },
      { type: 'line', text: '' },
      { type: 'line', text: 'with' },
      { type: 'line', text: '' },
      {
        type: 'code',
        source: 'let aLittleBitOf = \'Everythin\';\nmodule.exports = document.here;\ndocument.there = document.here;',
        language: 'javascript',
        settings: { output: true, module: true },
        module: true,
        output: 'test',
      },
      { type: 'line', text: '' },
      { type: 'line', text: '' },
      { type: 'line', text: 'in it' },
    ]);
    expect(result.modules).to.be.eql([{
      type: 'code',
      source: 'let aLittleBitOf = \'Everythin\';\nmodule.exports = document.here;\ndocument.there = document.here;',
      language: 'javascript',
      settings: { output: true, module: true },
      module: true,
      output: 'test',
    }]);

    expect(documentData.there).to.be.equal('test');
  })
});
