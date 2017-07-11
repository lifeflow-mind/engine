import Base, { blockWrapper } from './base';
import javascriptParser from '../code/javascript';
import Runtime from '../../runtime';
import IModule from '../../types/imodule';

const regEx = /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n|$)/;

class Code extends Base {
  async createObject(input: string, runtime?: Runtime, document: any = {}): blockWrapper {
    const matches = input.match(regEx);
    if (matches !== null) {
      const language = matches[2];
      let body = matches[3];
      let settings: {[name: string]: any} = {};
      if (language === 'javascript' || language === 'typescript') {
        const js = javascriptParser(body);
        settings = js.settings;
        body = js.raw;
      }
      const module: IModule = {
        type: 'code',
        source: body,
        language,
        settings,
        module: settings.module || false,
        output: undefined,
      };
      if (settings.output && typeof runtime !== 'undefined') {
        module.output = await runtime.invoke(module, document);
      }
      return [input.substring(matches[0].length), module]
    } else {
      return undefined;
    }
  }
}

export default Code;
