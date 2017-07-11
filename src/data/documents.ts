import { Subject } from 'rxjs';
import Engine from '../engine';
import { RxDocument, RxQuery } from 'rxdb';

class Documents {
  private _current: Subject<any>;
  private _search: Subject<any>;
  private _engine: Engine;

  constructor(engine: Engine) {
    this._current = new Subject();
    this._search = new Subject();
    this._engine = engine;
    this.setDocument = this.setDocument.bind(this);
  }

  public get current() {
    return this._current;
  }

  public get search() {
    return this._search;
  }

  public async upsert(document: any) {
    const db = await this._engine.getDB();
    const documents = db.documents;
    return await documents.upsert(document);
  }

  public setDocument(document: any) {
    this._current.next(document);
  }

  public async select(id: string) {
    const db = await this._engine.getDB();
    const documents = db.documents;
    const query = this._current;
    documents.findOne().$.subscribe(query);
  }

  public async clean() {
    const db = await this._engine.getDB();
    const documents = db.documents;
    let docs = await documents.find().exec();
    if (!Array.isArray(docs)) {
      docs = [docs];
    }
    await Promise.all(docs.map(doc => doc.remove()));
  }

  public async filter(fn: (input: RxQuery) => RxQuery) {
    const db = await this._engine.getDB();
    const documents = db.documents;
    const query = this._search;
    fn(documents.find()).$.subscribe(query);
  }
}

export default Documents;
