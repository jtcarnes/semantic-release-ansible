import isString from 'lodash.isstring';
import isBoolean from 'lodash.isboolean';
import isUndefined from 'lodash.isundefined';

export {verifyConfig};

async function verifyConfig(pluginConfig) {
  const errors = [];

  const collectionPath = pluginConfig.collectionPath;
  if (isUndefined(collectionPath)) {
    errors.push('collectionPath plugin is not defined. Required for plugin.');
  } else if (!isString(collectionPath)) {
    errors.push(`collectionPath is not a string. Received ${collectionPath}.`);
  }

  const publish = pluginConfig.collectionPublish;
  if (!isUndefined(publish) && !isBoolean(publish)) {
    errors.push(`collectionPublish should either be unset or boolean. Received ${publish}`);
  }

  const deleteCollectionArtifact = pluginConfig.deleteCollectionArtifact;
  if (!isUndefined(deleteCollectionArtifact) && !isBoolean(deleteCollectionArtifact)) {
    errors.push(`deleteCollectionArtifact must be either unset or a boolean. Received ${deleteCollectionArtifact}`);
  }

  return errors;
}
