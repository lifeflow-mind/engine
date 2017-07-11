// import * as babel from 'babel-core';
import * as types from 'typescript';

/* const latest = require('babel-preset-latest');
const stageOne = require('babel-preset-stage-1');
const react = require('babel-preset-react');
const babelRuntime = require('babel-plugin-transform-runtime'); */

export const javascript = (code: string) => {
  return code;
  /* return babel.transform(code, {
    presets: [latest, stageOne, react],
    plugins: [babelRuntime],
  }).code || ''; */
}

export const typescript = (code: string) => {
  return types.transpile(code, {
    jsx: 2,
  }) || '';
}
