import {constants} from 'node:fs';
import path from 'node:path';
import {access} from 'node:fs/promises';

export {checkFileExists, galaxyFiles, findGalaxyFile};

const galaxyFiles = ['galaxy.yml', 'MANIFEST.json'];

async function checkFileExists(filePath) {
  return access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

function findGalaxyFile(collectionPath, logger) {
  let foundFileName = '';

  // logger.log(`files at path ${collectionPath}: ${}`)
  for (const file in galaxyFiles) {
    if (Object.prototype.hasOwnProperty.call(galaxyFiles, file)) {
      const testPath = path.join(collectionPath, file);
      logger.log(`looking for ${file} at ${testPath}`);
      if (checkFileExists(testPath)) {
        logger.log(`Found ${file} at ${testPath}`);
        foundFileName = file;
        break;
      }
    }
  }

  return foundFileName;
}
