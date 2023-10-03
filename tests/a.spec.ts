import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  expect(true).toBeTruthy();
});

test('test2', async ({ page }) => {
  expect(true).toBeTruthy();
});

test('test3', async ({ page }) => {
  expect(false).toBeTruthy();
});

test.only('test4', async ({ page }) => {
  expect(false).toBeTruthy();
});

test('test5', async ({ page }) => {
  test.skip();
});

test('test6', async ({ page }) => {
  test.skip();
});



// const people = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank'];
const people = ['Alice', 'Bob', 'Charlie']
for (const name of people) {
  test.only(`testing with ${name}`, async () => {
    expect(true).toBeTruthy();
    const randomIndex = randomInteger(0, 1);
    if (randomIndex === 0) {
      expect(false).toBeTruthy();
    }
  });

}



function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}