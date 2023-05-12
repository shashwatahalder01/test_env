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

test('test4', async ({ page }) => {
  expect(false).toBeTruthy();
});

test('test5', async ({ page }) => {
  test.skip();
});

test('test6', async ({ page }) => {
  test.skip();
});

