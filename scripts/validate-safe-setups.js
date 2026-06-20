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

const { mockAlerts, mockBriefings, mockSetups } = require('../lib/mock-data.ts');
const { projectAlertForUser } = require('../lib/entitlements/get-safe-alerts.ts');
const { projectBriefingForUser } = require('../lib/entitlements/get-safe-briefings.ts');
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

const forbiddenBronzeBriefingFields = [
  'fullContent',
  'tinoNotes',
  'executionFocus',
  'premiumAnalysis',
  'eliteCommentary',
];

const forbiddenBronzeAlertFields = [
  'fullMessage',
  'executionDetails',
  'realTimeContext',
  'premiumCommentary',
  'eliteCommentary',
];

const bronzeBriefings = mockBriefings.map((briefing) => projectBriefingForUser(briefing, 'bronze'));
const platinumBriefings = mockBriefings.map((briefing) => projectBriefingForUser(briefing, 'platinum'));
const blackBriefings = mockBriefings.map((briefing) => projectBriefingForUser(briefing, 'black'));

for (const briefing of bronzeBriefings) {
  for (const field of forbiddenBronzeBriefingFields) {
    if (Object.prototype.hasOwnProperty.call(briefing, field)) {
      throw new Error(`Bronze briefing ${briefing.id} leaked ${field}`);
    }
  }
}

if (!platinumBriefings.every((briefing) => Object.prototype.hasOwnProperty.call(briefing, 'fullContent') && Object.prototype.hasOwnProperty.call(briefing, 'tinoNotes'))) {
  throw new Error('Platinum briefing payload did not include full fields');
}

if (!blackBriefings.some((briefing) => Object.prototype.hasOwnProperty.call(briefing, 'eliteCommentary'))) {
  throw new Error('Black briefing payload did not include eliteCommentary');
}

const bronzeAlerts = mockAlerts.map((alert) => projectAlertForUser(alert, 'bronze'));
const platinumAlerts = mockAlerts.map((alert) => projectAlertForUser(alert, 'platinum'));
const blackAlerts = mockAlerts.map((alert) => projectAlertForUser(alert, 'black'));

for (const alert of bronzeAlerts) {
  for (const field of forbiddenBronzeAlertFields) {
    if (Object.prototype.hasOwnProperty.call(alert, field)) {
      throw new Error(`Bronze alert ${alert.id} leaked ${field}`);
    }
  }
}

if (!platinumAlerts.every((alert) => Object.prototype.hasOwnProperty.call(alert, 'fullMessage') && Object.prototype.hasOwnProperty.call(alert, 'executionDetails'))) {
  throw new Error('Platinum alert payload did not include full fields');
}

if (!blackAlerts.some((alert) => Object.prototype.hasOwnProperty.call(alert, 'eliteCommentary'))) {
  throw new Error('Black alert payload did not include eliteCommentary');
}

console.log('Safe payload validation passed');
