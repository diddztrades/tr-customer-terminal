const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');

function resolveAlias(request) {
  if (!request.startsWith('@/')) {
    return request;
  }

  return path.join(repoRoot, request.slice(2));
}

require.extensions['.ts'] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;

  module._compile(output, filename);
};

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  return originalResolveFilename.call(this, resolveAlias(request), parent, isMain, options);
};

const { mockSetups } = require('../lib/mock-data.ts');
const { projectSetupForUser } = require('../lib/entitlements/project-setup.ts');

const forbiddenBronzeFields = [
  'entry',
  'stop',
  'target',
  'exactEntry',
  'stopInvalidation',
  'targetZone',
  'executionNotes',
  'tinoNote',
  'eliteDeskNote',
  'chartUrl',
  'realTimeTimestamp',
  'fullWhyThisMatters',
];

const bronzeSetups = mockSetups.map((setup) => projectSetupForUser(setup, 'bronze'));
const blackSetups = mockSetups.map((setup) => projectSetupForUser(setup, 'black'));

for (const setup of bronzeSetups) {
  for (const field of forbiddenBronzeFields) {
    if (Object.prototype.hasOwnProperty.call(setup, field)) {
      throw new Error(`Bronze setup ${setup.id} leaked ${field}`);
    }
  }
}

if (!blackSetups.some((setup) => Object.prototype.hasOwnProperty.call(setup, 'eliteDeskNote'))) {
  throw new Error('Black setup payload did not include eliteDeskNote');
}

console.log('Safe setup validation passed');
