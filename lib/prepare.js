import {readFile, writeFile} from 'node:fs/promises';
import {path} from 'node:path';
import {yaml} from 'js-yaml';
import {findGalaxyFile} from './utils.js';

export {prepareFile};

async function prepareFile(pluginConfig, context) {
  const logger = context.logger;
  const errors = [];
  const nextVersion = context.nextRelease.version;

  logger.log('Looking for ansible galaxy file.');
  const foundGalaxyFile = findGalaxyFile(pluginConfig.collectionPath, logger);

  if (!foundGalaxyFile) {
    errors.push('Could not find any galaxy files to update.');
  }

  const galaxyFilePath = path.join(pluginConfig.collectionPath, foundGalaxyFile);
  if (galaxyFilePath.endsWith('.yml')) {
    await updateGalaxyYaml(galaxyFilePath, nextVersion);
  } else if (galaxyFilePath.endsWith('.json')) {
    await updateManifestJson(galaxyFilePath, nextVersion);
  }

  return errors;
}

async function updateGalaxyYaml(filePath, version) {
  readFile(filePath)
    .then((content) => yaml.load(content))
    .then((oldYaml) => yaml.dump({...oldYaml, version: version})) // eslint-disable-line object-shorthand
    .then((newYaml) => writeFile(filePath, newYaml));
}

async function updateManifestJson(filePath, version) {
  readFile(filePath)
    .then((body) => JSON.parse(body))
    .then((json) => {
      json.version = version;
      return json;
    })
    .then((json) => JSON.stringify(json))
    .then((body) => writeFile(filePath, body));
}
