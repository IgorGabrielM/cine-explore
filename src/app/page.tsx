import NavBar from './components/NavBar';
import HomeMovies from './pages/home/page';

export default function Home() {
  return (
    <main>
      <header>
        <NavBar />
      </header>
      <main>
        <HomeMovies/>
      </main>
    </main>
  );
}
