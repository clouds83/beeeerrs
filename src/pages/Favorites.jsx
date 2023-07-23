import { useEffect, useState, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import BeersGrid from '../components/BeersGrid'

const perPageAmount = 12

const useFavoritesPagination = (favorites) => {
  const [beers, setBeers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPageAmount
    const endIndex = startIndex + perPageAmount
    const favoriteBeersPage = favorites.slice(startIndex, endIndex)

    setIsLoading(true)

    if (favoriteBeersPage.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else {
      setBeers(favoriteBeersPage)
      setIsLoading(false)
      setHasNextPage(favorites.length > endIndex)
    }
  }, [currentPage, favorites])

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  return { beers, currentPage, hasNextPage, isLoading, nextPage, previousPage, goToFirstPage }
}

const Favorites = () => {
  useEffect(() => {
    document.title = `Favorites | BEEEERRS!`
  }, [])

  const { favorites } = useContext(FavoritesContext)

  const { beers, currentPage, hasNextPage, isLoading, nextPage, previousPage, goToFirstPage } =
    useFavoritesPagination(favorites)

  return (
    <BeersGrid
      beers={beers}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      onGoToFirstPage={goToFirstPage}
      onNextPage={nextPage}
      onPreviousPage={previousPage}
      perPageAmount={perPageAmount}
      title="Your favorite beers"
    />
  )
}

export default Favorites
