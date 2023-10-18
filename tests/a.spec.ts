import { test, expect } from "@playwright/test";

test("test1 @lite", async () => {
  expect(true).toBeTruthy();
});

test("test2 @lite", async () => {
  expect(true).toBeTruthy();
});

test("test3 @liteonly", async () => {
  expect(false).toBeTruthy();
});

test("test4 @pro", async () => {
  expect(false).toBeTruthy();
});

test("test5 @pro", async () => {
  test.skip();
});

test("test6", async () => {
  test.skip();
});

// const people = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank'];
// const people = ["Alice", "Bob", "Charlie"];
// for (const name of people) {
//   test(`testing with ${name}`, async () => {
//     expect(true).toBeTruthy();
//     const randomIndex = randomInteger(0, 1);
//     if (randomIndex === 0) {
//       expect(false).toBeTruthy();
//     }
//   });
// }

// function randomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
