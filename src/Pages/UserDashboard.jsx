import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';

export default function UserDashboard({ search, setSearch }) {
  const token = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [liked, setLiked] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [genre, setGenre] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const fetchMovies = async () => {
    const res = await fetch('https://propftx-assignment-server.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMovies(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchMovies();
    setTimeout(() => setShowFilter(true), 400);
  }, []);

  useEffect(() => {
    let filteredMovies = movies;
    if (search) {
      filteredMovies = filteredMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.genre.toLowerCase().includes(search.toLowerCase()) ||
          m.director.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genre.length > 0) {
      filteredMovies = filteredMovies.filter((m) => genre.includes(m.genre));
    }
    setFiltered(filteredMovies);
    setCurrentPage(1);
  }, [search, genre, movies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [moviesPerPage]);

  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  const handleGenreChange = (g) => {
    setGenre((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const handleClearGenres = () => setGenre([]);

  const handleLike = (id) => {
    setLiked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setSnackbar({
        open: true,
        message: updated[id] ? 'Added to favorites!' : 'Removed from favorites!',
        severity: updated[id] ? 'success' : 'info',
      });
      return updated;
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const totalPages = Math.ceil(filtered.length / moviesPerPage);
  const paginatedMovies = filtered.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">

      {/* Mobile Search */}
      <div className="block md:hidden mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 rounded-lg border border-orange-300 bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Movie Cards */}
      {filtered.length === 0 ? (
        <div className="text-center text-orange-500 font-medium text-lg mt-16">
          No movies found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedMovies.map((movie) => (
              <div key={movie._id} className="flex justify-center">
                <MovieCard
                  movie={movie}
                  action={
                    <button
                      onClick={() => handleLike(movie._id)}
                      className={`text-2xl transition ${
                        liked[movie._id] ? 'text-orange-600' : 'text-orange-300 hover:text-orange-600'
                      }`}
                    >
                      {liked[movie._id] ? '🧡' : '🤍'}
                    </button>
                  }
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    currentPage === idx + 1
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-orange-100 text-orange-700 hover:bg-orange-200 transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-md text-white font-medium z-50
            ${snackbar.severity === 'success' ? 'bg-orange-600' : 'bg-orange-500'}
          `}
        >
          {snackbar.message}
          <button
            className="ml-4 text-lg hover:text-orange-200"
            onClick={handleCloseSnackbar}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
