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

  test.describe('Currency option list test', () => {
    test('Should be 14 options for the currency', async ({ page }) => {
      await page.goto(homePage);
      const selectElement = await page.$('select')
      const options = await selectElement.$$('option');
      expect(options.length).toBe(14); 
    });
  });

  test.describe('Currency function test', () => {
    test('Submit button should return target currency value', async ({ page }) => {
      await page.goto(homePage);
      await page.fill('input[type="number"]', '100');

      await page.waitForSelector('select[name="currency-from"]');
      await page.selectOption('select[name="currency-from"]', { value: 'CAD' });
      await page.waitForSelector('select[name="currency-to"]');
      await page.selectOption('select[name="currency-to"]', { value: 'EUR' });

      await page.click('input[type="submit"]');
      await expect(page.locator('#amount')).toContainText('EUR');
    });
  });

  test.describe('Alert test', () => { 
    test('If user pick the same currency, there should be alert', async ({ page }) => {
      await page.goto(homePage);
      page.on('dialog', async dialog => { 
        expect(dialog.type()).toContain('alert');

        expect(dialog.message()).toContain('Please select two different currencies');
        await dialog.dismiss();
      });
      await page.fill('input[type="number"]', '100');
      await page.waitForSelector('select[name="currency-from"]');
      await page.selectOption('select[name="currency-from"]', { value: 'CAD' });
      await page.waitForSelector('select[name="currency-to"]');
      await page.selectOption('select[name="currency-to"]', { value: 'CAD' });
    });
  });

  test.describe('Country test for currency and time', () => {
    test('Country for currency and time should match', async ({ page }) => {
      await page.goto(homePage);
      await page.fill('input[type="number"]', '100');
      await page.waitForSelector('select[name="currency-from"]');
      await page.selectOption('select[name="currency-from"]', { value: 'CAD' });
      await page.waitForSelector('select[name="currency-to"]');
      await page.selectOption('select[name="currency-to"]', { value: 'EUR' });
      await page.click('input[type="submit"]');

      const timeFrom = await page.$eval('#time-from', el => el.textContent);
      expect(timeFrom).toContain('Canada');

      const timeTo = await page.$eval('#time-to', el => el.textContent);
      expect(timeTo).toContain('Europe');
    });
  });

  test.describe('BicMac price information list', () => {
    test('BicMac price information should have 3 types of info', async ({ page }) => {
      await page.goto(homePage);
      await page.goto(homePage);
      await page.fill('input[type="number"]', '100');
      await page.waitForSelector('select[name="currency-from"]');
      await page.selectOption('select[name="currency-from"]', { value: 'CAD' });
      await page.waitForSelector('select[name="currency-to"]');
      await page.selectOption('select[name="currency-to"]', { value: 'EUR' });
      await page.click('input[type="submit"]');

      const BicMacPriceInfo = await page.$('#BicMac');
      const content = await BicMacPriceInfo.textContent();
      expect(content).toContain('Local Price');
      expect(content).toContain('Dollar Exchange');
      expect(content).toContain('Dollar Price');
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

