import NavBar from "../NavBar"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from "axios"

jest.mock('axios');

describe("Testing navbar", () => {
    it("Search movies", () => {

        render(<NavBar />)

        const input = screen.getByTestId('search-movie');
        fireEvent.change(input, { target: { value: 'Test Movie' } });

        expect(input.value).toBe('Test Movie');
    })

    it('should call selectPage function when clicking forward-button', async () => {
        axios.get.mockResolvedValue({
            data: {
                results: [],
                page: 1,
                total_pages: 3,
            },
        });

        render(<NavBar />);

        fireEvent.change(screen.getByTestId('search-movie'), { target: { value: 'the' } });

        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        fireEvent.click(screen.getByTestId('forward-button'));

        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=the&page=2`
        );
    });

    it('searches for a movie and clicks on the first result', async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;

        mockedAxios.get.mockResolvedValue({
            data: {
                results: [
                    { id: 1, title: 'The Movie' },
                ],
                page: 1,
                total_pages: 1,
            },
        });

        render(<NavBar />);

        const searchInput = screen.getByTestId('search-movie');
        fireEvent.change(searchInput, { target: { value: 'the' } });

        await waitFor(() => {
            expect(screen.getByTestId('movie-searched')).toBeInTheDocument();
        });

        const firstMovieResult = screen.getByTestId('movie-searched');
        fireEvent.click(firstMovieResult);
    });
})