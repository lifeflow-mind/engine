import spawner from './node-spawner';
import { expect } from 'chai';

describe('runtime', () => {
  describe('spawner', () => {
    describe('node', () => {
      it('should be able to create an export', async () => {
        const module = await spawner(`
          exports.test = 'hello world';
        `, {}, () => undefined);
        expect(module).to.be.eql({
          test: 'hello world',
        });
      });

      it('should be able to create a default', async () => {
        const module = await spawner(`
          module.exports = 'hello world';
        `, {}, () => undefined);
        expect(module).to.be.eql('hello world');
      });
    });
  });
});
