import React from 'react';

export default function MovieCard({ movie, action }) {
  return (
    <div className="bg-white border border-orange-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col overflow-hidden font-sans">
      {/* Image */}
      <div className="relative group">
        <img
          src={movie.avatar}
          alt={movie.title}
          className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          title={movie.title}
          className="text-2xl font-bold text-orange-900 mb-3 leading-tight"
        >
          {movie.title}
        </h3>

        {/* Description */}
        <p className="text-base text-orange-800  leading-relaxed line-clamp-3" aria-label={movie.description}>
          {movie.description}
        </p>

        {/* Metadata */}
        <div className="mt-auto flex flex-col gap-4 text-sm text-orange-700">
          <div>
            <h4 className="text-xs uppercase font-semibold text-orange-500 mb-1">Director</h4>
            <p className="text-orange-800">{movie.director}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase font-semibold text-orange-500 mb-1">Year</h4>
            <time
              dateTime={movie.createdAt}
              className="text-orange-700 font-light"
              title={movie.createdAt ? new Date(movie.createdAt).toLocaleString() : undefined}
            >
              {movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : 'N/A'}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
