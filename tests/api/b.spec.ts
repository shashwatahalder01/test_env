import { test, expect } from '@playwright/test';

test('test_b_1 ', async () => {
  process.env.ABC = 'abc abc abc abc abc abc';
  expect(true).toBeTruthy();
});

test('test_b_2', async ( ) => {
  expect(true).toBeTruthy();
  console.log(process.env.ABC);
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

