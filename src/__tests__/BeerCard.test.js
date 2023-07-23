import { render, screen } from '@testing-library/react'
import BeerCard from '../components/BeerCard'
import { MemoryRouter } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'

test('should render beer card', () => {
  const beer = {
    id: 1,
    name: 'Beer 1',
    tagline: 'Tagline 1',
  }

  const addFavorite = jest.fn()
  const removeFavorite = jest.fn()
  const isFavorite = jest.fn(() => false)

  render(
    <MemoryRouter>
      <FavoritesContext.Provider value={{ addFavorite, removeFavorite, isFavorite }}>
        <BeerCard beer={beer} />
      </FavoritesContext.Provider>
    </MemoryRouter>
  )

  const beerCard = screen.getByTestId('beer-card')
  expect(beerCard).toBeInTheDocument()
})
