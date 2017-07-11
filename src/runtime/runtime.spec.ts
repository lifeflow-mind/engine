import evalSpawner from './eval-spawner';
import Runtime from './index';
import { expect } from 'chai';

const simpleModule = `
module.exports = 'hello';
`

const consumerModule = `
const simple = require('simple-module');
module.exports = simple + 'world';
`

describe('runtime', () => {
  let runtime: Runtime;

  beforeEach(() => {
    runtime = new Runtime(evalSpawner);
  });

  xit('should be able to add modules', async () => {
    /*await runtime.addModule('simple-module', simpleModule);
    const module = runtime.getModule('simple-module');
    expect(module).to.be.equal('hello');*/
  });

  xit('should be able to access modules', async () => {
    /*await runtime.addModule('simple-module', simpleModule);
    await runtime.addModule('consumer-module', consumerModule);
    const module = runtime.getModule('consumer-module');
    expect(module).to.be.equal('helloworld');*/
  });
});
