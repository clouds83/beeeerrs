import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import reportWebVitals from './reportWebVitals'

import './index.css'

import App from './App'
import Loading from './components/Loading'
const LazyHome = React.lazy(() => import('./pages/Home'))
const LazySearch = React.lazy(() => import('./pages/Search'))
const LazyBeer = React.lazy(() => import('./pages/Beer'))
const LazyFavorites = React.lazy(() => import('./pages/Favorites'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route
              path="/"
              element={
                <React.Suspense>
                  <LazyHome />
                </React.Suspense>
              }
            />
            <Route
              path="search"
              element={
                <React.Suspense>
                  <LazySearch />
                </React.Suspense>
              }
            />
            <Route
              path="favorites"
              element={
                <React.Suspense>
                  <LazyFavorites />
                </React.Suspense>
              }
            />
            <Route
              path="beer/:id"
              element={
                <React.Suspense fallback={<Loading />}>
                  <LazyBeer />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
