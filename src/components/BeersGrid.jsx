import React from 'react'
import BeerCard from './BeerCard'
import EmptyBeers from './EmptyBeers'
import './BeersGrid.css'

const BeersGrid = ({
  beers,
  title,
  currentPage,
  hasNextPage,
  isLoading,
  onPreviousPage,
  onNextPage,
  onGoToFirstPage,
  searchTypeLabel,
  queryText,
  perPageAmount,
}) => {
  const isSinglePage = beers.length <= perPageAmount - 1 && currentPage === 1

  return (
    <main className="beers-grid container" data-testid="beers-grid">
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && beers.length === 0 && <EmptyBeers />}
      {!isLoading && beers.length > 0 && (
        <div className="beers-grid__row row">
          <div className="beers-grid__col col">
            <h2 className="beers-grid__title title">
              <span>
                {title}{' '}
                {searchTypeLabel && (
                  <span>
                    {searchTypeLabel}: "<span className="beers-grid__query-text query-text">{queryText}</span>"
                  </span>
                )}
              </span>
              {!isSinglePage && (
                <span className="beers-grid__current-page title__current-page">
                  <strong>Page:</strong> {currentPage}
                </span>
              )}
            </h2>
            <div className="beers-grid__row row">
              {beers.map((beer) => (
                <div key={beer.id} className="beers-grid__card-wrapper col-sm-6 col-md-3 col-lg-3 col-xl-2">
                  <BeerCard beer={beer} />
                </div>
              ))}
            </div>
            {!isSinglePage && (
              <div className="beers-grid__pagination pagination">
                <button
                  className="beers-grid__pagination-button pagination__button"
                  onClick={onPreviousPage}
                  disabled={currentPage === 1}>
                  <svg viewBox="0 0 320 512" height="16" fill="#FFFFFF" xmlns="http://www.w3.org/1600/svg">
                    <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                  </svg>
                  Previous Page
                </button>
                <button
                  className="beers-grid__pagination-button pagination__button"
                  onClick={onNextPage}
                  disabled={!hasNextPage}>
                  Next Page
                  <svg viewBox="0 0 320 512" height="16" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                  </svg>
                </button>
                {currentPage !== 1 && (
                  <button className="pagination__back-page1" onClick={onGoToFirstPage}>
                    Go to page 1
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default BeersGrid
