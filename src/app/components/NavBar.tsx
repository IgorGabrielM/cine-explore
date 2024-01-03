"use client"
import { IMovieApiResponse } from "app/interfaces/movieApiResponse";
import axios from "axios";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowLeft } from "react-icons/md";

interface NavBarProps { }

export default function NavBar({ }: NavBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [moviesSearched, setMoviesSearched] = useState<IMovieApiResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [pages, setPages] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    searchMovies(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const searchMovies = async (movieTitle: string, page: number = 1) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=${movieTitle}&page=${page}`
      );
      const searchedMovies: IMovieApiResponse = response.data;
      setMoviesSearched(searchedMovies);

      const totalPages = searchedMovies.total_pages;
      if (totalPages === 1) {
        setPages([1]);
      } else {
        if (searchedMovies.page === 1) {
          setPages([1, 2, 3]);
        } else if (searchedMovies.page === totalPages) {
          setPages([searchedMovies.page - 1, searchedMovies.page]);
        } else {
          setPages([
            searchedMovies.page - 1,
            searchedMovies.page,
            searchedMovies.page + 1,
          ]);
        }
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const selectPage = (page: number): void => {
    if (page < 1) {
      setPages([moviesSearched.total_pages]);
      searchMovies(inputValue, moviesSearched.total_pages);
    } else if (page + 1 >= moviesSearched.total_pages) {
      setPages([1]);
      searchMovies(inputValue, 1);
    } else if (page === 0) {
      setPages([moviesSearched.total_pages]);
      searchMovies(inputValue, moviesSearched.total_pages);
    } else {
      setPages([page]);
      searchMovies(inputValue, page);
    }
  };

  return (
    <div>
      <nav className="w-full h-fit py-3 border border-b border-gray-800 flex gap-2 flex-col justify-around items-center lg:flex-row">
        <p className="flex items-center gap-2 text-2xl text-[color:#95D5B2] hover:text-[color:#D8F3DC] duration-200">
          <BiCameraMovie /><span className="font-bold">Filmes</span>
        </p >

        <form className="px-5 flex items-center border border-gray-600 rounded-full">
          <input
            data-testid="search-movie"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Busque um filme"
            className="bg-transparent focus:outline-none p-2 text-white"
          />
          <BiSearchAlt2 />
        </form>
      </nav>
      <div className="relative">
        {isOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-stone-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 sm:p-4 pb-0">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center mx-auto sm:mt-0 sm:text-left">
                      <form className="w-full flex justify-around items-center border-b border-gray-600">
                        <BiSearchAlt2 />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleChange}
                          placeholder="Busque um filme"
                          className="bg-transparent focus:outline-none p-2 text-white px-5"
                        />
                        <button
                          type="button"
                          onClick={closeDialog}
                          className="rounded-md text-sm px-2 py-1 opacity-80 font-bold bg-[color:#2D6A4F] text-white hover:bg-[color:#40916C] hover:opacity-100"
                        >
                          Esc
                        </button>
                      </form>

                      <div className="mt-2">
                        {moviesSearched && moviesSearched.results.length > 0 ? (
                          moviesSearched.results.slice(0, 15).map((movie) => (
                            <Link
                              href={`/pages/movie/${movie.id}`} // Assuming this is the correct path
                              key={movie.id}
                              data-testid="movie-searched"
                            >
                              <div className="w-80 px-2 py-1 my-2 border border-stone-700 rounded-lg hover:bg-stone-700 shadow-xl cursor-pointer">
                                <p className="w-72 truncate">{movie.title}</p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p className="text-center">Não há filmes correspondentes...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto w-80 flex justify-center px-4 py-2">
                  <nav>
                    <ul className="inline-flex -space-x-px text-sm text-gray-500">
                      {moviesSearched && moviesSearched.page > 1 ? (
                        <li onClick={() => selectPage(moviesSearched.page - 1)} data-testid="back-button">
                          <p className="flex items-center text-2xl justify-center px-1 h-8 ms-0 leading-tight text-gray-500 border border-stone-700 rounded-s-lg hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2">
                            <MdArrowLeft />
                          </p>
                        </li>
                      ) : (
                        <></>
                      )}

                      {pages && pages.length ? (
                        <div className="flex">
                          {moviesSearched.total_pages !== 1 && pages[0] ? (
                            <li onClick={() => selectPage(pages[0])} key={pages[0]}>
                              <p
                                className={
                                  pages[0] !== moviesSearched.page
                                    ? "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2 hover:font-bold"
                                    : "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 bg-[color:#52B788] hover:border-[color:#52B788] hover:border-2 font-bold text-black"
                                }
                              >
                                {pages[0]}
                              </p>
                            </li>
                          ) : (
                            <></>
                          )}
                          {moviesSearched.total_pages !== 1 && pages[1] ? (
                            <li onClick={() => selectPage(pages[1])} key={pages[1]}>
                              <p
                                className={
                                  pages[1] !== moviesSearched.page
                                    ? "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2 hover:font-bold"
                                    : "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 bg-[color:#52B788] hover:border-[color:#52B788] hover:border-2 font-bold text-black"
                                }
                              >
                                {pages[1]}
                              </p>
                            </li>
                          ) : (
                            <></>
                          )}
                          {moviesSearched.total_pages !== 1 && pages[2] ? (
                            <li onClick={() => selectPage(pages[2])} key={pages[2]}>
                              <p
                                className={
                                  pages[2] !== moviesSearched.page
                                    ? "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2 hover:font-bold"
                                    : "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 bg-[color:#52B788] hover:border-[color:#52B788] hover:border-2 font-bold text-black"
                                }
                              >
                                {pages[2]}
                              </p>
                            </li>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div className="w-32 h-full flex justify-center items-center">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[color:#52B788]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      )}
                      {moviesSearched && moviesSearched.page !== moviesSearched.total_pages ? (
                        <li onClick={() => selectPage(moviesSearched.page + 1)} data-testid="forward-button">
                          <p className="flex items-center text-xl justify-center px-1 h-8 leading-tight border border-stone-700 rounded-e-lg hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2">
                            <IoMdArrowDropright />
                          </p>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
