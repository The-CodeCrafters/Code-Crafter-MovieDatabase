import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [theme, setTheme] = useState('dark-theme');
  const [showGenres, setShowGenres] = useState(false);

  const scrollContainerRef = useRef(null);
  const genresContainerRef = useRef(null);

  const API_KEY = '3ba21b02';
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
  const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY_HERE'; // Add your YouTube API key here

  useEffect(() => {
    let animationFrameId;
    let startTime;

    const autoScroll = (timestamp) => {
      if (!isAutoScrolling || !scrollContainerRef.current) return;

      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const scrollContainer = scrollContainerRef.current;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const scrollAmount = (progress / 50) % maxScroll;

      scrollContainer.scrollLeft = scrollAmount;

      if (scrollAmount >= maxScroll) {
        startTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling]);

  const fetchRecentMovies = async () => {
    try {
      const year = new Date().getFullYear();
      const response = await fetch(`${API_URL}&s=movie&y=${year}&type=movie`);
      const data = await response.json();
      setRecentMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching recent movies:', error);
    }
  };

  const fetchYearMovies = async (year) => {
    try {
      const response = await fetch(`${API_URL}&s=movie&y=${year}&type=movie`);
      const data = await response.json();
      return data.Search || [];
    } catch (error) {
      console.error(`Error fetching movies for ${year}:`, error);
      return [];
    }
  };

  const fetchTrailer = async (movieTitle) => {
    try {
      console.log('Fetching trailer for:', movieTitle);
      const encodedTitle = encodeURIComponent(`${movieTitle} official trailer`);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedTitle}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
      );
      const data = await response.json();
      console.log('YouTube API Response:', data);
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      } else {
        console.warn('No trailers found for:', movieTitle);
        return null;
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return null;
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}&i=${id}`);
      const data = await response.json();
      const trailerId = await fetchTrailer(data.Title);
      setSelectedMovie({ ...data, trailerId });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const searchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoviesByGenre = async (genre) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${genre}&type=movie`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error(`Error fetching movies for genre ${genre}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=series&type=series`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setMovies([]);
    setSearchTerm('');
  };

  useEffect(() => {
    fetchRecentMovies();
    const loadMovies = async () => {
      const movies2024 = await fetchYearMovies('2024');
      const movies2025 = await fetchYearMovies('2025');
      setLatestMovies([...movies2024, ...movies2025]);
    };
    loadMovies();
  }, []);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const toggleGenres = () => {
    setShowGenres((prevState) => !prevState);
    console.log("Genres visibility:", !showGenres);
  };

  const handleClickOutside = (event) => {
    if (genresContainerRef.current && !genresContainerRef.current.contains(event.target)) {
      setShowGenres(false);
    }
  };

  //useEffect(() => {
    //if (showGenres) {
      document.addEventListener('click', handleClickOutside);
    //} else {
      document.removeEventListener('click', handleClickOutside);
    //}

    //return () => {
      document.removeEventListener('click', handleClickOutside);
    //};
  //}, [showGenres]);

  return (
    <div className="app">
      <div className="app-header">
        <h1>
          <span className="spin">C</span>rafters
        </h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => searchMovies(searchTerm)}>Search</button>
          <button className="clear-button" onClick={clearSearch}>Clear</button>
          <button onClick={toggleGenres}>Genres</button>
          <button onClick={fetchTvShows}>Tv shows</button>
          
        </div>
        <div className="theme-switcher">
          <button>Theme</button>
          <div className="theme-switcher-content">
            <button onClick={() => handleThemeChange('dark-theme')}>Dark</button>
            <button onClick={() => handleThemeChange('light-theme')}>Light</button>
            
          </div>
        </div>
      </div>

      <div className="app-content">
        {movies.length > 0 ? (
          <section className="search-results">
            <h2>Search Results</h2>
            <div className="grid">
              {movies.map((movie) => (
                <div
                  className="movie-card"
                  key={movie.imdbID}
                  onClick={() => getMovieDetails(movie.imdbID)}
                >
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                    alt={movie.Title}
                  />
                  <h3>{movie.Title}</h3>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="recent-movies">
              <h2>Recent Releases</h2>
              <div
                ref={scrollContainerRef}
                className="horizontal-grid"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {recentMovies.map((movie, index) => (
                  <div
                    className={`movie-card ${index === Math.floor(recentMovies.length / 2) ? 'middle' : ''}`}
                    key={movie.imdbID}
                    onClick={() => getMovieDetails(movie.imdbID)}
                  >
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                      alt={movie.Title}
                    />
                    <h3>{movie.Title}</h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="latest-movies">
              <h2>Latest Movies</h2>
              <div className="grid">
                {latestMovies.map((movie) => (
                  <div
                    className="movie-card"
                    key={movie.imdbID}
                    onClick={() => getMovieDetails(movie.imdbID)}
                  >
                    <img
                      //src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                      alt={movie.Title}
                    />
                    <h3>{movie.Title}</h3>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {showGenres && (
          <div className="genres-container">
            <ul>
              <li onClick={() => fetchMoviesByGenre('Action')}>Action</li>
              <li onClick={() => fetchMoviesByGenre('Adventure')}>Adventure</li>
              <li onClick={() => fetchMoviesByGenre('Comedy')}>Comedy</li>
              <li onClick={() => fetchMoviesByGenre('Crime')}>Crime</li>
              <li onClick={() => fetchMoviesByGenre('Drama')}>Drama</li>
              <li onClick={() => fetchMoviesByGenre('Documentary')}>Documentary</li>
              <li onClick={() => fetchMoviesByGenre('Family')}>Family</li>
              <li onClick={() => fetchMoviesByGenre('Fantasy')}>Fantasy</li>
              <li onClick={() => fetchMoviesByGenre('Horror')}>Horror</li>
              <li onClick={() => fetchMoviesByGenre('Romance')}>Romance</li>
              <li onClick={() => fetchMoviesByGenre('Sci-Fi')}>Sci-Fi</li>
              <li onClick={() => fetchMoviesByGenre('Thriller')}>Thriller</li>
              <li onClick={() => fetchMoviesByGenre('Western')}>Western</li>
              {/* Add more genres as needed */}
            </ul>
          </div>
        )} 

      /*  {selectedMovie && (
          <div className="movie-details-modal">
            <div className="modal-content">
              <button className="close-btn" onClick={handleCloseModal}>×</button>
              <div className="modal-grid">
                <img
                  src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/400'}
                  alt={selectedMovie.Title}
                />
                <div className="details">
                  <h2>{selectedMovie.Title}</h2>
                  <p><strong>Released:</strong> {selectedMovie.Released}</p>
                  <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                  <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                  <p><strong>Director:</strong> {selectedMovie.Director}</p>
                  <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                  <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                  <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
                  
                  <TrailerButton
                    trailerId={selectedMovie.trailerId}
                    title={selectedMovie.Title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;