import {readdir} from 'node:fs/promises';
import {hasbin} from 'hasBin';
import {galaxyFiles, findGalaxyFile} from './utils.js';

export {verifyFiles};

async function verifyFiles(pluginConfig, context) {
  const errors = [];
  const logger = context.logger;

  logger.log('checking collectionPath option');
  if (!pluginConfig.collectionPath) {
    errors.push('Missing argument: collectionPath');
  }

  logger.log('checking if ansible-galaxy is installed if publishCollection is true.');
  if (pluginConfig.publishCollection) {
    hasbin('ansible-galaxy', (result) => {
      if (!result) {
        errors.push('ansible-galaxy is not on PATH. Required if publish is true.');
      }
    });
  }

  const foundGalaxyFile = findGalaxyFile(pluginConfig.collectionPath, logger);

  if (!foundGalaxyFile) {
    const files = await readdir(pluginConfig.collectionPath);
    errors.push(
      `Was not able to file any of ${galaxyFiles.join(',')} at ${pluginConfig.collectionPath}. Found ${files.join(',')}`
    );
  }

  return errors;
}
