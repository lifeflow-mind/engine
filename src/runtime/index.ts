import IModule from '../types/imodule';
import { javascript, typescript } from './transpiler';
export type spawner = (source: string, document: any, getModule: (name: string) => any) => any;

class Runtime {
  private _spawner: spawner;
  private _modules: {[name: string]: any} = {};

  constructor(spawner: spawner) {
    this._spawner = spawner;
  }

  public async addModule(name: string, module: IModule) {
    const exports = await this.invoke(module);
    this._modules[name] = exports;
  }

  public getModule(name: string) {
    return this._modules[name];
  }

  public async invoke(module: IModule, document: any = {}) {
    let source = module.source;
    if (module.language === 'javascript') {
      source = javascript(source);
    }
    if (module.language === 'typescript') {
      source = typescript(source);
    }
    try {
      const exports = await this._spawner(source, document, this.getModule.bind(this));
      return exports;
    }
    catch (err) {
      return err;
    }
  }
}

export default Runtime;
