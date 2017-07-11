import {
  Base,
  Code,
  Headline1,
  Headline2,
  Line,
} from './block';
import IBlock from '../types/iblock';
import IModule from '../types/imodule';
import Runtime from '../runtime';

const readers: Base[] = [
  new Code(),
  new Headline1(),
  new Headline2(),
  new Line(),
];

export default async (content: string, runtime?: Runtime, documentData: any = {}) => {
  let contentCopy = content.trim();
  const result = [];
  while(contentCopy.length > 0) {
    for (let i = 0; i < readers.length; i++) {
      const reader = readers[i];
      const output = await reader.createObject(contentCopy, runtime, documentData);
      if (output) {
        const [remaining, object] = output;
        contentCopy = remaining;
        result.push(object);
        continue;
      }
    }
  }

  return {
    modules: result.filter((item: IModule) => item.settings && item.settings.name),
    blocks: result,
    data: documentData,
  };
}
