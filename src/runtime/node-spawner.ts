import * as vm from 'vm';

export default (source: string, document: any, getModules: (name: string) => any) => {
  const module = {
    exports: {},
  };

  const context = vm.createContext({
    document,
    module,
    require: getModules,
    exports: module.exports,
  });

  vm.runInContext(source, context);

  return module.exports as any;
};
