import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './Beer.css'
import { FavoritesContext } from '../context/FavoritesContext'

const beersURL = process.env.REACT_APP_API_ENDPOINT

const Beer = () => {
  const { id } = useParams()
  const [beer, setBeer] = useState(null)
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  const getBeer = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setBeer(data[0])
  }

  useEffect(() => {
    const beerURL = `${beersURL}/${id}`
    getBeer(beerURL)
  }, [id])

  useEffect(() => {
    document.title = beer ? `${beer.name} | BEEEERRS!` : 'Loading... | BEEEERRS!'
  }, [beer])

  const handleToggleFavorite = () => {
    isFavorite(beer) ? removeFavorite(beer) : addFavorite(beer)
  }

  return (
    <main className="beer container">
      {beer && (
        <div className="row">
          <div className="col-xl-8 col-md-12 beer__wrapper">
            <div className="row">
              <div className="beer__image col-md-5 col-sm-12">
                <div className="beer__image-wrapper">
                  <img src={beer.image_url} alt={`${beer.name}`} />
                </div>
              </div>
              <div className="col-md-7 col-sm-12">
                <h2 className="beer__name">{beer.name}</h2>
                <p className="beer__tagline">{beer.tagline}</p>

                <button
                  className={`beer__favorite-button ${isFavorite(beer) ? 'beer__favorite-button--active' : ''}`}
                  onClick={handleToggleFavorite}>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isFavorite(beer) ? '#F04438' : 'none'}
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                        stroke={isFavorite(beer) ? '#F04438' : '#2f3d0d'}
                        strokeWidth={isFavorite(beer) ? 2 : 1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {isFavorite(beer) ? ' Remove from favorites' : ' Add to favorites'}
                  </span>
                </button>

                <p className="beer__description">{beer.description}</p>

                <div className="beer__details-section">
                  <h2 className="beer__details-section-heading">Main Details</h2>
                  <p>
                    <strong>First brewed:</strong> {beer.first_brewed}
                  </p>
                  <p>
                    <strong>Alcohol by volume:</strong> {beer.abv}%
                  </p>
                  <p>
                    <strong>International Bitterness Units:</strong> {beer.ibu}
                  </p>
                  <p>
                    <strong>Attenuation level:</strong> {beer.attenuation_level}%
                  </p>
                  <p>
                    <strong>Color:</strong> {beer.srm}
                  </p>
                  <p>
                    <strong>European Brewing Convention:</strong> {beer.ebc}
                  </p>
                </div>

                <div className="beer__details-section">
                  <h2 className="beer__details-section-heading">Food Pairing</h2>
                  <ul className="beer__details-list">
                    {beer.food_pairing.map((pairing, index) => (
                      <li key={index} className="beer__details-list-item">
                        {pairing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="beer__details-section">
                  <h2 className="beer__details-section-heading">Ingredients</h2>
                  <p>
                    <strong>Yeast:</strong>
                  </p>
                  <ul>
                    <li>{beer.ingredients.yeast}</li>
                  </ul>
                  <p>
                    <strong>Hops:</strong>
                  </p>
                  <ul className="beer__details-list">
                    {beer.ingredients.hops.map((hop, index) => (
                      <li key={index} className="beer__details-list-item">
                        {hop.name} - {hop.amount.value} {hop.amount.unit} - {hop.add} - {hop.attribute}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Other:</strong>
                  </p>
                  <ul className="beer__details-list">
                    {beer.ingredients.malt.map((malt, index) => (
                      <li key={index} className="beer__details-list-item">
                        {malt.name} - {malt.amount.value} {malt.amount.unit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="beer__details-section">
                  <h2 className="beer__details-section-heading">Other Details</h2>
                  <p>
                    <strong>Brewers tips:</strong> {beer.brewers_tips}
                  </p>
                  <p>
                    <strong>pH:</strong> {beer.ph}
                  </p>
                  <p>
                    <strong>SRM:</strong> {beer.srm}
                  </p>
                  <p>
                    <strong>Method:</strong>
                    {beer.method.mash_temp.map((mash, index) => (
                      <span key={index} className="beer__details-list-item">
                        {' '}
                        {mash.temp.value} {mash.temp.unit} {mash.duration && `- ${mash.duration} minutes`}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Volume:</strong> {beer.volume.value} {beer.volume.unit}
                  </p>
                  <p>
                    <strong>Boil volume:</strong> {beer.boil_volume.value} {beer.boil_volume.unit}
                  </p>
                  <p>
                    <strong>Target Original Gravity:</strong> {beer.target_og}
                  </p>
                  <p>
                    <strong>Target Final Gravity:</strong> {beer.target_fg}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Beer
