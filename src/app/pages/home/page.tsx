"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '@/app/components/MovieCard';

export default function HomeMovies() {
  const [topMovies, setTopMovies]: [any[], any] = useState([]);

  const getTopRatedMovies = async (url: string) => {
    try {
      const response = await axios.get(url);
      setTopMovies(response.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}`;
    getTopRatedMovies(apiUrl);
  }, []);

  return (
    <main className='w-full mx-2'>
      <h2 className="text-3xl text-center my-5 font-bold text-[color:#D8F3DC]">Aclamados pela crítica:</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {topMovies.length === 0 && <p>Carregando..</p>}
      {topMovies.length > 0 && topMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </main>
  );
}
