import { Link } from 'react-router-dom'
import { useMemo, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import BeerFoam from '../assets/beer-foam.png'

import './BeerCard.css'

const BeerCard = ({ beer }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const isBeerFavorite = useMemo(() => isFavorite(beer), [isFavorite, beer])

  const heartIcon = useMemo(
    () => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isBeerFavorite ? '#F04438' : 'none'}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
          stroke={isBeerFavorite ? 'white' : '#2f3d0d'}
          strokeWidth={isBeerFavorite ? 1 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    [isBeerFavorite]
  )

  const handleToggleFavorite = () => {
    isFavorite(beer) ? removeFavorite(beer) : addFavorite(beer)
  }

  return (
    <div className="beer-card card" data-testid="beer-card">
      <img className="beer-card__img card__img" src={beer.image_url} alt={beer.name} />
      <div className="beer-card__body card__body">
        <h5 className="beer-card__title card__title text-truncate">{beer.name}</h5>

        <p className="beer-card__description card__description">{beer.tagline}</p>
        <div className="beer-card__info card__info">
          <span>
            <strong>ABV:</strong> {beer.abv}%
          </span>
          <span>
            <strong>IBU:</strong> {beer.ibu}%
          </span>
        </div>
        <Link to={`/beer/${beer.id}`} className="beer-card__link card__link">
          <span className="beer-card__link-text card__link-text">Details</span>
        </Link>
        <button className="beer-card__favorite-button card__favorite-button" onClick={handleToggleFavorite}>
          {heartIcon}
        </button>
        <img src={BeerFoam} alt="" className="beer-card__beer-foam" />
      </div>
    </div>
  )
}

export default BeerCard
