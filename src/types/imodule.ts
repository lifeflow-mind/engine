import iblock from './iblock';

interface IModule extends iblock {
  source: string,
  language: string,
  settings: any,
  module: boolean,
  output: any,
};

export default IModule;
