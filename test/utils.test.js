import test from 'ava';
import {findGalaxyFile} from '../lib/utils.js';
import mock from 'mock-fs';
// import stub from 'sinon';

test.afterEach((t) => {
  mock.restore();
});

// test.beforeEach((t) => {
//   // Stub the logger functions
//   t.context.log = stub();
//   t.context.logger = {log: t.context.log};
// });

test('Test galaxy.yml based collection', async (t) => {
  mock({
    '/galaxyCollection/galaxy.yml': 'example: item',
    '/galaxyCollection/another_file.yml': 'another: example',
    '/galaxyCollection/otherfile.md': 'this should be ignored'
  });

  t.deepEqual(await findGalaxyFile('/galaxyCollection', console), 'galaxy.yml');
});

// test('Test galaxy.yml based collection', async (t) => {
//   mock({
//     Collection: {
//       'galaxy.yml': 'example',
//       'other.txt': 'empty example',
//       'another.txt': 'something'
//     }
//   });

//   t.deepEqual(await findGalaxyFile('./galaxyCollection', console), 'galaxy.yml');
// });
