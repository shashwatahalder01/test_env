import { test, expect } from '@playwright/test';

test('test_b_1 ', async () => {
  expect(true).toBeTruthy();
});

test('test_b_2', async ( ) => {
  expect(true).toBeTruthy();

});

// test('test3', async ( ) => {
//   expect(false).toBeTruthy();
// });

// test('test4', async ( ) => {
//   expect(false).toBeTruthy();
// });

test('test5', async ( ) => {
  test.skip();
});

test('test6', async ( ) => {
  test.skip();
});

