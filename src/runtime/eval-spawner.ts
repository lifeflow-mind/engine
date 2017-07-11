export default (source: string, document: any, getModules: (name: string) => any) => {
  const module = {
    exports: {},
  };
  const fn = new Function('document', 'require', 'module', 'exports', source);
  fn(document, getModules, module, exports.module);
  return module.exports;
};
