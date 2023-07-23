import React from 'react'
import emptyMugImage from '../assets/empty-beer-mug.png'
import './EmptyBeers.css'

const EmptyBeers = () => {
  return (
    <div className="empty-beers">
      <h2>No beers to show :(</h2>
      <img className="empty-beers__image" src={emptyMugImage} alt="" />
    </div>
  )
}

export default EmptyBeers
