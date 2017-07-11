import { create, plugin } from 'rxdb';
import * as pdmemory from 'pouchdb-adapter-memory';
import documentSchema from './schemas/document';
import * as uuid from 'uuid';
import { RxCollection, RxDatabase } from 'rxdb';

plugin(pdmemory);

const createPromise = create({
  name: 'mind',
  adapter: 'memory',
  multiInstance: true,
}).then(async (db) => {
  const documentCollection = await db.collection({
    name: 'documents',
    schema: documentSchema,
  } as any);
  return {
    db,
    documents: documentCollection,
  }
});

export const getDB = () => createPromise;
