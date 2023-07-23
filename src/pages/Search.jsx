import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BeersGrid from '../components/BeersGrid'

const perPageAmount = 12

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const searchType = searchParams.get('type')
  const searchURL = `${process.env.REACT_APP_API_ENDPOINT}/?${searchType}=${query}`

  const [isLoading, setIsLoading] = useState(true)
  const [beers, setBeers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  const getSearchTypeLabel = (type) => {
    switch (type) {
      case 'beer_name':
        return 'beer name'
      case 'food':
        return 'food pairing'
      case 'yeast':
        return 'yeast'
      case 'hops':
        return 'hops'
      case 'malt':
        return 'malt'
      case 'abv_gt':
        return 'ABV % greater than'
      case 'abv_lt':
        return 'ABV % less than'
      case 'ibu_gt':
        return 'IBU % greater than'
      case 'ibu_lt':
        return 'IBU % less than'
      default:
        return ''
    }
  }

  const fetchSearchResults = async (url) => {
    setIsLoading(true)

    const response = await fetch(url)
    const data = await response.json()
    setBeers(data)

    setIsLoading(false)

    if (data.length < perPageAmount) {
      setHasNextPage(false)
    } else {
      setHasNextPage(true)
    }
  }

  useEffect(() => {
    const searchByQueryURL = `${searchURL}&page=${currentPage}&per_page=${perPageAmount}`
    fetchSearchResults(searchByQueryURL)
  }, [searchURL, currentPage])

  useEffect(() => {
    document.title = `Search results: ${query} | BEEEERRS!`
  }, [query])

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
      beers={beers}
      title="Search results for"
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      onPreviousPage={previousPage}
      onNextPage={nextPage}
      onGoToFirstPage={goToFirstPage}
      searchTypeLabel={getSearchTypeLabel(searchType)}
      queryText={query}
      perPageAmount={perPageAmount}
    />
  )
}

export default Search
