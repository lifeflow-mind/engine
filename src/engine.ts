import parser from './parser';
import Runtime, { spawner } from './runtime';
import { getDB } from './db';
import { RxDatabase, RxCollection } from 'rxdb';
import Documents from './data/documents';
import IBlock from './types/iblock';
import IModule from './types/imodule';

class Engine {
  private _runtime: Runtime;
  private _documents: Documents;

  constructor(spawner: spawner) {
    this._runtime = new Runtime(spawner);
    this._documents = new Documents(this);
  }

  public get documents() {
    return this._documents;
  }

  public async getDB() {
    return await getDB();
  }

  async parse(content: string) {
    const parsed = await parser(content, this._runtime);
    const modules = parsed.modules;
    await Promise.all(modules.map(async (module: IModule) => {
      if (typeof module.settings.name === 'string') {
        const name = module.settings.name;
        await this._runtime.addModule(name, module);
      }
    }));
    return parsed;
  }

  async saveDocument(document: any) {
    const parsed = await parser(document.content);
    const modules = parsed.modules;
    await Promise.all(modules.map(async (module: IModule) => {
      if (typeof module.settings.name === 'string') {
        const name = module.settings.name;
        await this._runtime.addModule(name, module);
      }
    }));
  }
};

export default Engine;
