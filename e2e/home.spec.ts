import { test, expect, devices, } from '@playwright/test';
import Currency from '@/components/currency';


var homePage = 'http://localhost:3000';

test.beforeAll(async () => {
    console.log('before tests')
})

test.afterAll(async () => {
    console.log('After tests');

})


test.describe('Button test', () => {
    test('submit button should be present in the page', async ({ page }) => {
      await page.goto(homePage);
      await expect(page.locator('input[type="submit"]')).toBeVisible();
    });
  });


  test.describe('Button test', () => {
    test('submit button should have 50% border radius', async ({page}) => {
    await page.goto(homePage);
    const submitButton = await page.$('input[type="submit"]');
    const buttonStyle = await submitButton.evaluate(button => getComputedStyle(button));
    expect(buttonStyle.borderRadius).toBe('50%');
    });
  });


  test.describe('Background color test', () => {
    test('Background color should be #f6edda', async ({ page }) => {
      await page.goto(homePage);
     const backgroundColor = await page.$eval('#main', el => getComputedStyle(el).backgroundColor);
     expect(backgroundColor).toBe('rgb(246, 237, 218)');
    });
  });


test.use({
  browserName:'chromium',
  ...devices['iPhone XR']
})

test('Currency box should have a certain size on XR device', async ({ page }) => {
  await page.goto('http://localhost:3000');
await page.waitForSelector('#currency-box');
const currencyBox = await page.$('#currency-box');
const boxSize = await currencyBox.boundingBox();
expect(boxSize.width).toBe(250);
});

test('Money bag image should have a certain size on XR device', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForSelector('#money-bag');
  const moneyBag = await page.$('#money-bag');
  const boxSize = await moneyBag.boundingBox();
  expect(boxSize.width).toBe(50); 
});

