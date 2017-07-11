import Runtime from '../../runtime';
import IBlock from '../../types/iblock';
import IModule from '../../types/iblock';

export type blockWrapper = Promise<[string, (IBlock | IModule)] | undefined>;

abstract class BlockBase {
  abstract async createObject(input: string, runtime?: Runtime, document?: any): blockWrapper;
}

export default BlockBase;
