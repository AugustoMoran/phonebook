import { render, screen } from '@testing-library/react'
import Notification from './Notification'

describe('<Notification />', () => {
  test('renders nothing when message is null', () => {
    const { container } = render(<Notification message={null} messageType="success" />)
    expect(container).toBeEmptyDOMElement()
  })

  test('renders success message with proper class', () => {
    render(<Notification message="Added Arto" messageType="success" />)
    const element = screen.getByText('Added Arto')
    expect(element).toBeVisible()
    expect(element).toHaveClass('message')
    expect(element).not.toHaveClass('error')
  })

  test('renders error message with proper classes', () => {
    render(<Notification message="Validation failed" messageType="error" />)
    const element = screen.getByText('Validation failed')
    expect(element).toBeVisible()
    expect(element).toHaveClass('message')
    expect(element).toHaveClass('error')
  })
})
