import { createContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (favorite) => {
    setFavorites((prevFavorites) => [...prevFavorites, favorite])
  }

  const removeFavorite = (favorite) => {
    setFavorites((prevFavorites) => prevFavorites.filter((f) => f.id !== favorite.id))
  }

  const isFavorite = (favorite) => {
    return favorites.some((f) => f.id === favorite.id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
