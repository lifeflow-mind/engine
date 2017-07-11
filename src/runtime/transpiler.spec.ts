import { typescript, javascript } from './transpiler';
import { expect } from 'chai';
import spawner from './node-spawner';

describe('runtime', () => {
  describe('transpiler', () => {
    xit('should be able to transpile javascript', () => {
      const code = `
        const test = async () => {

        }
        test();
      `;
      const transpiled = javascript(code);
      expect(transpiled).to.be.equal(``);
    });

    xit('should be able to transpile typescript', () => {
      const code = `
        const test = async (test:string) => {

        }
        test();
      `;
      const transpiled = typescript(code);
      expect(transpiled).to.be.equal(``);
    });

    it('should be able to run transpiled typescript', async () => {
      const code = `
        const test = async (test: string) => {
          return 'test';
        }
        module.exports = test;
      `;
      const transpiled = typescript(code);
      const module = await spawner(transpiled, {}, () => {});
      expect(await module()).to.be.eql('test');
    });
  });
});
