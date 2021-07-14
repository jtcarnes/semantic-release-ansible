import test from 'ava';
import mock from 'mock-fs';
import mockBin from 'mock-bin';
import {verifyFiles} from '../lib/verify-files.js';

test.afterEach(() => {
  mock.restore();
});

test('Test galaxy.yml based collection', async (t) => {
  mock({
    '/anotherPath': {
      'galaxy.yml': 'example: example',
      'other.txt': 'empty example',
      'another.md': 'something',
      'another_file.yml': 'example: example',
    },
  });

  const log = 'ansible-galaxy mock';
  const ansibleGalaxy = await mockBin('ansible-galaxy', 'node', `console.log('${log}')`);
  ansibleGalaxy();
  const output = await verifyFiles({collectionPath: '/galaxyCollection', publishCollection: true}, {logger: console});
  console.log(output);
  // t.is(await verifyFiles({collectionPath: '/galaxyCollection', publishCollection: true}, {logger: console}), []);
});

// test('Test MANIFEST.json based collection', async (t) => {
//   mock({
//     '/manifestCollection': {
//       'MANIFEST.json': '{"example": "value"}',
//       'other.txt': 'empty example',
//       'another.md': 'something',
//     },
//   });

//   t.is(await findGalaxyFile('/manifestCollection', console), 'MANIFEST.json');
// });

// test('Test bad directory given (no proper files)', async (t) => {
//   mock({
//     '/badCollection': {
//       'someyaml.yml': 'example: example',
//       'other.txt': 'empty example',
//       'another.md': 'something',
//     },
//   });

//   t.is(await findGalaxyFile('/badCollection', console), '');
// });
