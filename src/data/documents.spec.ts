import Documents from './documents';
import Engine from '../engine';
import { expect } from 'chai';
import spawner from '../runtime/node-spawner';

describe('data', () => {
  describe('documents', () => {
    let engine: Engine;
    let documents: Documents;

    beforeEach(async () => {
      engine = new Engine(spawner);
      documents = new Documents(engine);
      await documents.clean();
    });

    it('should be able to insert a document', async () => {
      const document = await documents.upsert({
        id: 'hello',
        title: 'world',
      });

      const docClean = document.toJSON();

      expect(docClean.id).to.be.eql('hello');
      expect(docClean.title).to.be.eql('world');
    });

    it('should be able to select a document', async () => {
      const document = await documents.upsert({
        id: 'hello',
        title: 'world',
      });

      const subscription = documents.current.subscribe((doc) => {
        expect(doc.id).to.be.eql('hello');
        expect(doc.title).to.be.eql('world');
        subscription.unsubscribe();
      })

      documents.select('hello');
    });

    xit('should be able to search for documents', async () => {
      await documents.upsert({
        id: 'hello',
        title: 'world',
      });

      await documents.upsert({
        id: 'world',
        title: 'hello',
      });

      await documents.upsert({
        id: 'earth',
        title: 'hello',
      });

      return new Promise((resolve, reject) => {
        documents.search.subscribe((docs) => {
          const doc1 = docs[0];
          expect(doc1.id).to.be.eql('world');
          expect(doc1.title).to.be.eql('hello');

          const doc2 = docs[1];
          expect(doc1.id).to.be.eql('earth');
          expect(doc1.title).to.be.eql('hello');
          resolve();
        });

        documents.filter((query) => {
          return query;
        })
      });
    });
  });
});
