"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowLeft } from "react-icons/md";

export default function NavBar() {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [moviesSearched, setMoviesSearched]: [any, any] = useState();
  const [pages, setPages]: [any, any] = useState([]);


  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    searchMovies(event.target.value)
    if (event.target.value.length > 0) {
      setIsOpen(true)
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const searchMovies = async (movieTitle: string, page: number = 1) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=${movieTitle}&page=${page}`);
      setMoviesSearched(response.data);
      if (moviesSearched.page === 1) {
        setPages([1, 2]);
      } else if (moviesSearched.page === moviesSearched.total_pages) {
        setPages([moviesSearched.page - 1, moviesSearched.page]);
      }
      else {
        setPages([moviesSearched.page - 1, moviesSearched.page, moviesSearched.page + 1]);
      }
    } catch (error) { }
  };

  const selectPage = (page: number): void => {
    if (page < 1) {
      setPages(moviesSearched.total_pages)
      searchMovies(inputValue, moviesSearched.total_pages)
    } if ((page + 1) >= moviesSearched.total_pages) {
      setPages(1)
      searchMovies(inputValue, 1)
    } if ((page) === 0) {
      setPages(moviesSearched.total_pages)
      searchMovies(inputValue, moviesSearched.total_pages)
    }
    setPages(page)
    searchMovies(inputValue, page)
  }

  return (
    <div>
      <nav className="w-full h-16 border border-b border-gray-800 flex justify-around items-center">
        <Link href="pages/movie" className="flex items-center gap-2 text-2xl text-[color:#95D5B2] hover:text-[color:#D8F3DC] duration-200">
          <BiCameraMovie /> <span className="font-bold">Filmes</span>
        </Link>

        <form className="px-5 flex items-center border border-gray-600 rounded-full">
          <input type="text" value={inputValue} onChange={handleChange} placeholder="Busque um filme" className="bg-transparent focus:outline-none p-2 text-white" />
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
                        <input type="text" value={inputValue} onChange={handleChange} placeholder="Busque um filme" className="bg-transparent focus:outline-none p-2 text-white px-5" />
                        <button type="button" onClick={closeDialog}
                          className="rounded-md text-sm px-2 py-1 opacity-80 font-bold bg-[color:#2D6A4F] text-white hover:bg-[color:#40916C] hover:opacity-100">
                          Esc
                        </button>
                      </form>

                      <div className="mt-2">
                        {
                          moviesSearched && moviesSearched.results.length > 0 ? moviesSearched.results.slice(0, 15).map((movie: any) => {
                            return (
                              <Link href={`pages/movie/${movie.id}`} key={movie.id} >
                                <div className="w-80 px-2 py-1 my-2 border border-stone-700 rounded-lg hover:bg-stone-700 shadow-xl cursor-pointer">
                                  <p className="w-72 truncate">{movie.title}</p>
                                </div>
                              </Link>
                            )
                          }) : <p className="text-center">Não há filmes correspondentes...</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto w-80 flex justify-center px-4 py-2">
                  <nav>
                    <ul className="inline-flex -space-x-px text-sm text-gray-500">
                      {
                        moviesSearched && moviesSearched.page > 1 ?
                          <li onClick={() => selectPage(moviesSearched.page - 1)}>
                            <p className="flex items-center text-2xl justify-center px-1 h-8 ms-0 leading-tight text-gray-500 border border-stone-700 rounded-s-lg hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2">
                              <MdArrowLeft />
                            </p>
                          </li> : <></>
                      }
                      {
                        pages && pages.length > 0 && pages.map((page: number) => {
                          return (
                            <li onClick={() => selectPage(page)} key={page}>
                              <p className={page !== moviesSearched.page
                                ? "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2 hover:font-bold"
                                : "flex items-center justify-center px-3 h-8 leading-tight border border-stone-700 bg-[color:#52B788] hover:border-[color:#52B788] hover:border-2 font-bold text-black"
                              }>{page}</p>
                            </li>
                          )
                        })
                      }
                      {
                        moviesSearched && moviesSearched.page !== moviesSearched.total_pages
                          ? <li onClick={() => selectPage(moviesSearched.page + 1)}>
                            <p className="flex items-center text-xl justify-center px-1 h-8 leading-tight border border-stone-700 rounded-e-lg hover:text-[color:#52B788] hover:border-[color:#52B788] hover:border-2">
                              <IoMdArrowDropright />
                            </p>
                          </li>
                          : <></>}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}