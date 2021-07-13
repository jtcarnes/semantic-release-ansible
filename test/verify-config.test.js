import test from 'ava';
import stub from 'sinon';
import {verifyConfig} from '../lib/verify-config.js';

// test.beforeEach((t) => {
//   // Stub the logger functions
//   t.context.log = stub();
//   t.context.logger = {log: t.context.log};
// });

test('Verify correct config options pass', async (t) => {
  t.deepEqual(await verifyConfig({collectionPath: './', collectionPublish: true, deleteCollectionArtifact: false}), []);
});

test('Test no path was given should fail', async (t) => {
  t.is((await verifyConfig({collectionPublish: true, deleteCollectionArtifact: false})).length, 1);
});

test('Test that optional variables are optional', async(t) => {
  t.deepEqual(await verifyConfig({collectionPath: './'}), [])
});

test('Incorrect type for collectionPath', async (t) => {
  t.is((await verifyConfig({collectionPath: true})).length, 1);
});

test('Incorrect type for collectionPublish', async (t) => {
  t.is((await verifyConfig({collectionPath: './', collectionPublish: 'somestring'})).length, 1);
});

test('Incorrect type for deleteCollectionArtifact', async (t) => {
  t.is((await verifyConfig({collectionPath: './', deleteCollectionArtifact: 'somestring'})).length, 1);
});
