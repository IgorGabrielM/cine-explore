"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { format } from 'date-fns';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const [movie, setMovie]: [any, any] = useState();
  const [credits, setCredits]: [any, any] = useState();

  const getTopRatedMovies = async (url: string) => {
    try {
      const response = await axios.get(url);
      setMovie(response.data);
    } catch (error) { }
  };

  const getCredits = async (url: string) => {
    try {
      const response = await axios.get(url);
      setCredits(response.data)
    } catch (err) { }
  }

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API}${params.id}?${process.env.NEXT_PUBLIC_API_KEY}`;
    getTopRatedMovies(apiUrl);
    getCredits(`${process.env.NEXT_PUBLIC_API}${params.id}/credits?${process.env.NEXT_PUBLIC_API_KEY}`);
  }, []);

  return (
    <div className="flex justify-center">
      {movie ? (
        <div className="flex justify-center">
          <Link href="../../" className="bg-[color:#74C69D] p-1 absolute top-3 left-2 rounded-full text-black text-2xl shadow-xl shadow-black">
            <FaArrowAltCircleLeft />
          </Link>
          <div className="w-8/12 bg-stone-800">
            <div className="flex">
              <img className='w-56 rounded-t-lg' src={process.env.NEXT_PUBLIC_IMG + movie.poster_path} alt={"Imagem do filme: " + movie.title} />
              <div className="p-5">
                <div className="flex justify-between mt-2">
                  <h1 className="truncate font-bold text-3xl text-[color:#B7E4C7]" data-testid="title">{movie.title}</h1>
                  <div className='px-2 flex items-center gap-2 bg-[color:#74C69D] text-sm rounded-lg shadow-xl shadow-black'>
                    <FaStar />
                    <p data-testid="vote">{movie.vote_average.toFixed(2)}</p>
                  </div>
                </div>
                <div className="w-8/12 flex flex-col gap-2 mt-2">
                  <p className="text-sm" data-testid="description">
                    <span className="font-bold mr-2 text-lg">Descrição:</span>
                    {movie.overview}
                  </p>
                  <p data-testid="runtime">
                    <span className="font-bold mr-2">Duração:</span>
                    {movie.runtime} minutos
                  </p>
                  <p data-testid="release-date">
                    <span className="font-bold mr-2">Data de lançamento:</span>
                    {format(new Date(movie.release_date), 'dd/MM/yyyy')}
                  </p>
                  <div className="flex gap-2">
                    <span className="font-bold mr-2">Gêneros:</span>
                    <div className="flex flex-wrap gap-5" data-testid="gender">
                      {movie.genres.length > 0 && movie.genres.map((genr: { id: number, name: string }) => (
                        <p key={genr.id} className="px-2 bg-[color:#40916C] rounded-lg" >{genr.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-96 mt-3">
                <span className="font-bold mr-2">Elenco:</span>
                <Swiper
                  className="w-96 h-40 flex justify-center mt-2 mb-2"
                  modules={[Scrollbar]}
                  spaceBetween={3}
                  slidesPerView={4}
                  initialSlide={1}
                  scrollbar={{ draggable: true }}
                >
                  {credits && credits.cast.length > 0 ? (
                    credits.cast.map((cast: any) => (
                      <SwiperSlide key={cast.cast_id}>
                        <div className="w-96 flex flex-col items-center">
                          {cast.profile_path ? (
                            <img
                              className="w-16"
                              src={process.env.NEXT_PUBLIC_IMG + cast.profile_path}
                              alt={"Imagem do ator: " + cast.original_name}
                            />
                          ) : (
                            <img
                              className="w-10 h-[60px] object-cover"
                              src="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
                              alt={"Imagem do ator: " + cast.original_name}
                            />
                          )}
                          <p className="text-center w-20 truncate">{cast.original_name}</p>
                          <p className="text-center w-20 truncate text-gray-400">{cast.character}</p>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide role="status" className="mt-2">
                      <p>Carregando elenco...</p>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div role="status" className="mt-5">
          <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-[color:#52B788]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      )}
    </div>
  );
}
