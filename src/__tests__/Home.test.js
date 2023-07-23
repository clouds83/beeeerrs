import { render, screen, cleanup } from '@testing-library/react'
import Home from '../pages/Home'

afterEach(() => {
  cleanup()
})

test('should render the Home component', () => {
  render(<Home />)
  const beersGridElement = screen.getByTestId('beers-grid')
  expect(beersGridElement).toBeInTheDocument()
})

test('should render the initial state of the component', () => {
  render(<Home />)
  const beersGridElement = screen.getByTestId('beers-grid')
  expect(beersGridElement).toHaveTextContent('Loading...')
})
