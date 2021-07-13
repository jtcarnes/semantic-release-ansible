import {AggregateError} from 'aggregate-error.js';
import {verifyFiles} from './lib/verify-files.js';
import {verifyConfig} from './lib/verify-config.js';
import {publishCollection} from './lib/publish.js';
import {prepareFile} from './lib/prepare.js';

let verified = false;
let prepared = false;

export {verifyConditions, prepare, publish};

async function verifyConditions(pluginConfig, context) {
  const errors = [];

  const configErrors = await verifyConfig(pluginConfig);
  const fileErrors = await verifyFiles(pluginConfig, context);
  errors.push(...configErrors, ...fileErrors);
  if (errors.length > 0) {
    throw new AggregateError(errors); // eslint-disable-line unicorn/error-message
  }

  verified = true;
}

async function prepare(pluginConfig, context) {
  if (!verified) {
    await verifyConditions(pluginConfig, context);
  }

  const errors = await prepareFile(pluginConfig, context);
  if (errors.length > 0) {
    throw new AggregateError(errors); // eslint-disable-line unicorn/error-message
  }

  prepared = true;
}

async function publish(pluginConfig, context) {
  if (!verified) {
    await verifyConditions(pluginConfig, context);
  }

  if (!prepared) {
    await prepareFile(pluginConfig, context);
  }

  await publishCollection(pluginConfig, context);
}
