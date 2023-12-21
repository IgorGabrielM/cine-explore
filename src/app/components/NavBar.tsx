import Link from "next/link";
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"

export default function NavBar() {
    return (
        <nav className="w-full h-16 border border-b border-gray-800 flex justify-around items-center">
        <Link href="pages/movie" className="flex items-center gap-2 text-2xl text-[color:#95D5B2] hover:text-[color:#D8F3DC] duration-200">
          <BiCameraMovie/> <span className="font-bold">Filmes</span>
        </Link>
        
        <form className="px-5  flex items-center border border-gray-600 rounded-full">
          <input type="text" placeholder="Busque um filme" className="bg-transparent focus:outline-none p-2" />
          <button type="submit">
            <BiSearchAlt2/>
          </button>
        </form>
      </nav>
    )
  }