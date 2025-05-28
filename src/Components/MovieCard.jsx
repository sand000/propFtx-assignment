import React from 'react';

export default function MovieCard({ movie, action }) {
  return (
    <div className="bg-white border border-blue-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col overflow-hidden">
      <div className="relative group">
        <img
          src={movie.avatar}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 right-3 z-20 bg-white bg-opacity-90 backdrop-blur-md rounded-full p-1 shadow-sm transition-opacity duration-300 opacity-80 hover:opacity-100">
          {action}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3
          title={movie.title}
          className="text-xl font-semibold text-blue-900 mb-2 truncate"
        >
          {movie.title}
        </h3>
        <div className="flex gap-3 mb-4 flex-wrap">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full select-none">
            {movie.genre}
          </span>
          <span className="bg-blue-200 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full select-none">
            {movie.releaseYear}
          </span>
        </div>
        <p className="text-blue-700 text-sm mb-6 line-clamp-3" aria-label={movie.description}>
          {movie.description}
        </p>
        <div className="flex items-center justify-between text-xs text-blue-700 font-medium mt-auto">
          <span className="truncate">
            <span className="font-semibold">Director: </span>
            {movie.director}
          </span>
          <time
            dateTime={movie.createdAt}
            className="text-blue-400 font-light"
            title={movie.createdAt ? new Date(movie.createdAt).toLocaleString() : undefined}
          >
            Added: {movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : 'N/A'}
          </time>
        </div>
      </div>
    </div>
  );
}
