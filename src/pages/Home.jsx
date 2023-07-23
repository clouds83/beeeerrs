import { useState, useEffect } from 'react'
import BeersGrid from '../components/BeersGrid'

const beersURL = process.env.REACT_APP_API_ENDPOINT

const Home = () => {
  useEffect(() => {
    document.title = 'Beerrs | Your handcrafted beer catalog'
  }, [])

  const perPage = 12

  const [beers, setBeers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const getBeers = async () => {
    const url = `${beersURL}/?page=${currentPage}&per_page=${perPage}`

    setIsLoading(true)

    const response = await fetch(url)
    const data = await response.json()

    setBeers(data)
    setHasNextPage(data.length === perPage)
    setIsLoading(false)
  }

  useEffect(() => {
    getBeers()
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      setHasNextPage(true)
    }
  }

  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  return (
    <BeersGrid
      data-testid="home-beers-grid"
      beers={beers}
      title="All beers"
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      onPreviousPage={previousPage}
      onNextPage={nextPage}
      onGoToFirstPage={goToFirstPage}
    />
  )
}

export default Home
