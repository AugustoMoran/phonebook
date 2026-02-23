import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import personService from './services/persons'

vi.mock('./services/persons', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deletePerson: vi.fn()
  }
}))

describe('<App />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('loads and renders persons from backend on startup', async () => {
    personService.getAll.mockResolvedValue({
      data: [
        { id: '1', name: 'Arto Hellas', number: '040-1234567' },
        { id: '2', name: 'Ada Lovelace', number: '09-1234556' }
      ]
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Arto Hellas/i)).toBeVisible()
      expect(screen.getByText(/Ada Lovelace/i)).toBeVisible()
    })
  })

  test('shows error notification when initial fetch fails', async () => {
    personService.getAll.mockRejectedValue(new Error('network failed'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Error fetching persons')).toBeVisible()
    })
  })
})
