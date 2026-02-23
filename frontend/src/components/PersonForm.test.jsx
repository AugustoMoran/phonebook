import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PersonForm from './PersonForm'

test('<PersonForm /> calls submit handler when form is submitted', async () => {
  const user = userEvent.setup()
  const addPerson = vi.fn((event) => event.preventDefault())
  const handleNameChange = vi.fn()
  const handleNumberChange = vi.fn()

  render(
    <PersonForm
      newName=""
      handleNameChange={handleNameChange}
      newNumber=""
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
    />
  )

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'Linus Torvalds')
  await user.type(inputs[1], '050-11223344')
  await user.click(screen.getByRole('button', { name: 'add' }))

  expect(handleNameChange.mock.calls.length).toBeGreaterThan(0)
  expect(handleNumberChange.mock.calls.length).toBeGreaterThan(0)
  expect(addPerson).toHaveBeenCalledTimes(1)
})
