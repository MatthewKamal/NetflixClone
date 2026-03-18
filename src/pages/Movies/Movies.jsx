import React, { useEffect, useState, useRef } from "react";
import "./Movies.css";
import Navbar from "../../components/Navbar/Navbar";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2VlOGIxYzdmNjljYjAwMGJkMGZiMWZiNGEwMzAxYSIsIm5iZiI6MTc3MjI3MjY5My41MDQ5OTk5LCJzdWIiOiI2OWEyYmMzNWVjZWUyMzMzMmNjMTZmOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Mu7-n80c45dLfgFB6sFSP60D1Y6KRR9CR1NbXdDsgMk";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const GENRES = [
  { id: "all", name: "All" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_TOKEN,
  },
};

const MovieCard = ({ movie, index }) => {
  const [hovered, setHovered] = useState(false);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return (
    <div
      className={`movie-card ${hovered ? "hovered" : ""}`}
      style={{ "--index": index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-poster">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            <span>{movie.title?.[0]}</span>
          </div>
        )}
        <div className="card-overlay">
          <button className="play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="card-actions">
            <button className="action-btn" title="Add to My List">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button className="action-btn like-btn" title="Like">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
          </div>
          <div className="card-info">
            <h3 className="card-title">{movie.title}</h3>
            <div className="card-meta">
              <span className="rating">
                <svg viewBox="0 0 24 24" fill="#e50914" width="12" height="12">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating}
              </span>
              {year && <span className="year">{year}</span>}
            </div>
            <p className="card-overview">{movie.overview?.slice(0, 80)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [heroMovie, setHeroMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const heroRef = useRef(null);

  const fetchMovies = async (genreId, sort, pageNum) => {
    setLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&page=${pageNum}&language=en-US&include_adult=false`;
      if (genreId !== "all") url += `&with_genres=${genreId}`;

      const res = await fetch(url, options);
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 20));
      if (pageNum === 1 && data.results?.length > 0) {
        setHeroMovie(data.results[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      fetchMovies(activeGenre, sortBy, 1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`,
        options,
      );
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(1);
      setHeroMovie(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(activeGenre, sortBy, page);
  }, [activeGenre, sortBy, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) searchMovies(searchQuery);
      else fetchMovies(activeGenre, sortBy, 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleGenre = (id) => {
    setActiveGenre(id);
    setPage(1);
    setSearchQuery("");
  };

  return (
    <div className="movies-page">
      <Navbar />
      {heroMovie && !searchQuery && (
        <div
          className="movies-hero"
          ref={heroRef}
          style={{
            backgroundImage: heroMovie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
              : "none",
          }}
        >
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-badge">🎬 Featured</div>
            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-overview">
              {heroMovie.overview?.slice(0, 200)}...
            </p>
            <div className="hero-meta">
              <span className="hero-rating">
                ★ {heroMovie.vote_average?.toFixed(1)}
              </span>
              <span className="hero-year">
                {heroMovie.release_date?.slice(0, 4)}
              </span>
            </div>
            <div className="hero-buttons">
              <button className="hero-play">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="hero-more">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="movies-controls">
        <div className="controls-left">
          <h2 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : "Movies"}
          </h2>
          <div className="genre-pills">
            {GENRES.map((g) => (
              <button
                key={g.id}
                className={`genre-pill ${activeGenre === g.id ? "active" : ""}`}
                onClick={() => handleGenre(g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
        <div className="controls-right">
          <div className={`search-box ${searchActive ? "active" : ""}`}>
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => setSearchActive(true)}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onFocus={() => setSearchActive(true)}
              onBlur={() => !searchQuery && setSearchActive(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => {
                  setSearchQuery("");
                  setSearchActive(false);
                }}
              >
                ×
              </button>
            )}
          </div>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="release_date.desc">Latest</option>
            <option value="revenue.desc">Box Office</option>
          </select>
        </div>
      </div>

      <div className="movies-grid-wrapper">
        {loading ? (
          <div className="loading-grid">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="skeleton-card" style={{ "--i": i }} />
              ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="no-results">
            <span>🎬</span>
            <p>No movies found</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
      </div>

      {!searchQuery && totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ‹ Prev
          </button>
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              return (
                <button
                  key={p}
                  className={`page-num ${p === page ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
