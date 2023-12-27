import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

export default function MovieCard(movie: any, showLink = true) {
    return (
        <Link href={"pages/movie/" + movie.movie.id} data-testid="movie-card">
            <section className="w-56 h-96 pb-3 bg-stone-800 m-2 rounded-xl text-center relative hover:scale-105 duration-150">
                {movie && (
                    <div>
                        <img className='w-56 rounded-t-lg' src={process.env.NEXT_PUBLIC_IMG + movie.movie.poster_path} alt={"Imagem do filme: " + movie.movie.title} />
                        <h2 className='text-lg truncate mx-2 mt-2'>{movie.movie.title}</h2>
                        <div className='px-2 flex items-center gap-2 bg-[color:#74C69D] absolute top-2 right-2 text-sm rounded-lg shadow-xl shadow-black'>
                            <FaStar />
                            <p>{movie.movie.vote_average.toFixed(2)}</p>
                        </div>
                    </div>)}
            </section>
        </Link>
    );
}
