
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MOVIE_DETAILS_URL } from 'utils/urls'
import Loader from './Loader'
import NotFound from './NotFound'
// import Icon from '../assets/icon-back.svg'

const MovieDetails = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log(movieId)
    fetch(MOVIE_DETAILS_URL(movieId))
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDetails(data)
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goBack = () => {
    navigate('/')
  }

  if (loading) return <Loader />

  if (error) return <NotFound />

  return (
    <article
      className="details-container"
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/original${details.backdrop_path})`
      }}>
      <div className="details-summary">
        <div className="test">
          <button type="button" onClick={goBack} className="link-back">
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="black"><path className="back-button" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM116.7 244.7l112-112c4.6-4.6 11.5-5.9 17.4-3.5s9.9 8.3 9.9 14.8l0 64 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 64c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-112-112c-6.2-6.2-6.2-16.4 0-22.6z" /></svg> Movies
          </button>
        </div>
        <img className="details-summary-poster" src={details ? `https://image.tmdb.org/t/p/w342${details.poster_path}` : ''} alt={details.title} />
        <div className="details-summary-text">
          <h1 className="details-summary-text-header">
            <span className="details-summary-text-header-title">{details.title} </span>
            <span className="details-summary-text-header-rating">⭐️ {details.vote_average.toFixed(1)}</span>
          </h1>
          <p className="details-summary-text-description">{details.overview}</p>
        </div>
      </div>
    </article>
  )
}

export default MovieDetails

// @TODO add icon to link, fix text animation & styling