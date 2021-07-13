import {unlink} from 'node:fs/promises';
import execa from 'execa';
import {isNil} from 'lodash';

export {publishCollection};

async function publishCollection(pluginConfig, context) {
  const logger = context.logger;
  const publishCollection = pluginConfig.collectionPublish;
  logger.log('Detecting if ansible collection publish should run.');
  if (publishCollection || isNil(publishCollection)) {
    logger.log('Building collection.');
    const result = await execa('ansible-galaxy', ['collection', 'build', pluginConfig.collectionPath]);

    // Currently, the last in the ansible-galaxy cli is the tar path
    const tarPath = result.split(' ').pop();
    logger.log(`built collection at ${tarPath}`);

    logger.log('Pushing collection.');
    const collectionPublishStdout = await execa('ansible-galaxy', ['collection', 'publish', tarPath]);
    logger.log(`ansible-galaxy collection output: ${collectionPublishStdout}`);

    if (pluginConfig.deleteCollectionArtifact) {
      logger.log(`Deleting collection artifact at: ${tarPath}`);
      await unlink(tarPath);
    } else {
      logger.log(`Leaving collection artifact at ${tarPath}`);
    }
  } else {
    logger.log('collectionPublish was set to false. Skipping ansible collection publish.');
  }
}
