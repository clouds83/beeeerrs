import { render, screen, cleanup } from '@testing-library/react'
import BeersGrid from '../components/BeersGrid'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'

afterEach(() => {
  cleanup()
})

test('should render loading state', () => {
  render(<BeersGrid isLoading={true} beers={[]} />)

  const loadingElement = screen.getByText('Loading...')
  expect(loadingElement).toBeInTheDocument()
})

test('renders empty state when no beers', () => {
  render(<BeersGrid isLoading={false} beers={[]} />)
  const emptyBeersElement = screen.getByText('No beers to show :(')
  expect(emptyBeersElement).toBeInTheDocument()
})

test('renders beers when not loading', () => {
  const sampleBeers = [
    { id: 1, name: 'Beer 1', tagline: 'Tagline 1' },
    { id: 2, name: 'Beer 2', tagline: 'Tagline 2' },
  ]

  const addFavorite = jest.fn()
  const removeFavorite = jest.fn()
  const isFavorite = jest.fn(() => false)

  render(
    <MemoryRouter>
      <FavoritesContext.Provider value={{ addFavorite, removeFavorite, isFavorite }}>
        <BeersGrid isLoading={false} beers={sampleBeers} />
      </FavoritesContext.Provider>
    </MemoryRouter>
  )

  const beer1Element = screen.getByText('Beer 1')
  const beer2Element = screen.getByText('Beer 2')
  expect(beer1Element).toBeInTheDocument()
  expect(beer2Element).toBeInTheDocument()
})
