// import test from 'ava';
// import mock from 'mock-fs';
// import {findGalaxyFile} from '../lib/utils.js';
// // import fs from 'node:fs';
// // import stub from 'sinon';

// test.afterEach(() => {
//   mock.restore();
// });

// test('Test galaxy.yml based collection', async (t) => {
//   mock({
//     '/galaxyCollection': {
//       'galaxy.yml': 'example: example',
//       'other.txt': 'empty example',
//       'another.md': 'something',
//       'another_file.yml': 'example: example',
//     },
//   });

//   t.is(await findGalaxyFile('/galaxyCollection', console), 'galaxy.yml');
// });

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
