import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import LogoIcon from '../assets/beeeerrs-icon.png'
import './Navbar.css'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!search) return

    const type = searchType || 'beer_name'

    navigate(`/search?q=${search}&type=${type}`)

    setSearch('')
    setSearchType('')
  }

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value)
  }

  return (
    <div className="navbar" id="navbar">
      <nav className="container navbar__container">
        <div className="row">
          <div className="col">
            <div className="navbar__left-side">
              <h1 className="navbar__logo">
                <NavLink to="/" className="navbar__logo-link">
                  BEEEERRS!
                  <img src={LogoIcon} alt="Logo" className="navbar__logo-icon" />
                </NavLink>
              </h1>
              <ul className="navbar__navigation">
                <li>
                  <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar__navigation-link--active' : '')}>
                    Home
                  </NavLink>
                </li>
                <li className="navbar__navigation-item">
                  <NavLink to="/favorites" className="navbar__navigation-link">
                    Favorites
                  </NavLink>
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="navbar__search">
              <div className="navbar__select-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2f3d0d"
                  width="20"
                  className="navbar__search-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                </svg>
                <select className="navbar__search-select" value={searchType} onChange={handleSearchTypeChange}>
                  <option value="">Search by</option>
                  <option value="beer_name">Beer Name</option>
                  <option value="food">Food Pairing</option>
                  <option value="yeast">Yeast</option>
                  <option value="hops">Hops</option>
                  <option value="malt">Malt</option>
                  <option value="abv_gt">ABV % Greater Than</option>
                  <option value="abv_lt">ABV % Less Than</option>
                  <option value="ibu_gt">IBU % Greater Than</option>
                  <option value="ibu_lt">IBU % Less Than</option>
                </select>
              </div>
              <input
                type="search"
                placeholder="Search beer"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="navbar__search-input"
              />
              <button type="submit" className="navbar__search-button">
                GO!
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
