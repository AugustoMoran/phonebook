import { test, expect } from '@playwright/test'

test.describe('Phonebook app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/persons', {
      data: {
        name: 'Arto Hellas',
        number: '040-1234567'
      }
    })

    await page.goto('/')
  })

  test('can add a new contact', async ({ page }) => {
    const inputs = page.getByRole('textbox')

    await inputs.first().fill('Ada Lovelace')
    await inputs.nth(1).fill('09-1234556')
    await page.getByRole('button', { name: 'add' }).click()

    await expect(page.getByText(/Ada Lovelace\s+09-1234556/i)).toBeVisible()
  })

  test('can filter contacts', async ({ page }) => {
    const inputs = page.getByRole('textbox')

    await inputs.first().fill('Ada Lovelace')
    await inputs.nth(1).fill('09-1234556')
    await page.getByRole('button', { name: 'add' }).click()

    const searchInput = page.getByRole('textbox').nth(2)
    await searchInput.fill('arto')

    await expect(page.getByText(/Arto Hellas\s+040-1234567/i)).toBeVisible()
    await expect(page.getByText(/Ada Lovelace\s+09-1234556/i)).not.toBeVisible()
  })

  test('can delete a contact', async ({ page }) => {
    page.once('dialog', dialog => dialog.accept())

    const artoRow = page.getByText(/Arto Hellas\s+040-1234567/i).locator('..')
    await artoRow.getByRole('button', { name: 'delete' }).click()

    await expect(page.getByText(/Contact removed/i)).toBeVisible()
    await expect(page.getByText(/Arto Hellas\s+040-1234567/i)).not.toBeVisible()
  })
})
