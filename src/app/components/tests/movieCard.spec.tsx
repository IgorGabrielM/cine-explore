import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../MovieCard';

const movieIdForTest = 278

test('Verifica se o link está funcionando corretamente', () => {
    // Mock do objeto movie
    const movie = {
        movie: {
            id: 278,
            poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
            title: 'The Shawshank Redemption',
            vote_average: 8.708,
        },
    };

    render(<MovieCard
        {...movie} />);

    const linkElement = screen.getByTestId('movie-card');

    expect(linkElement).toHaveAttribute('href', `pages/movie/${movieIdForTest}`);

    fireEvent.click(linkElement);
});
