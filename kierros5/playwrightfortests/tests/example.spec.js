const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('blogs app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('vaara')
      await page.getByRole('textbox').last().fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('vaara salasana logged in')).toBeVisible()
    })
  })
  describe('blog creation', () => {
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('testiblogi')
      await page.getByRole('textbox').last().fill('testiblogi')
      await page.getByRole('button', { name: 'create' }).click()
      await page.goto('http://localhost:5173')
      await expect(page.getByText('testiblogi')).toBeVisible()
    })
  })
  describe('blog likes', () => {
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('testiblogilikelle')
      await page.getByRole('textbox').last().fill('testiblogilikelle')
      await page.getByRole('button', { name: 'create' }).click()
      await page.goto('http://localhost:5173')
      await page.getByText('testiblogilikelle').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
    })
  })
  describe('blog deletion', () => {
    test('a new blog can be delete', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('testiblogideletelle')
      await page.getByRole('textbox').last().fill('testiblogideletelle')
      await page.getByRole('button', { name: 'create' }).click()
      await page.goto('http://localhost:5173')
      await page.getByText('testiblogideletelle').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete blog' }).click()
    })
  })
  describe('blog deletion only possible with right user', () => {
    test('a new blog can be delete', async ({ page, request }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').first().fill('testiblogideletenapillevainoikeallahenkilollä1')
      await page.getByRole('textbox').last().fill('testiblogideletenapillevainoikeallahenkilollä1')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'Logout' }).click()
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'pekka',
          username: 'pekka',
          password: 'pekka'
        }
      })
      await page.goto('http://localhost:5173')
      await page.getByRole('textbox').first().fill('pekka')
      await page.getByRole('textbox').last().fill('pekka')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByText('testiblogideletenapillevainoikeallahenkilollä1').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete blog' }).not.toBeVisible()
    })
  })
})