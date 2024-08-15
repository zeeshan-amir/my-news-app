// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';
import NewsApiService from '../../services/NewsApiService';
import GurdianApiService from '../../services/GurdianApiService';
import NYTimesService from '../../services/NYTimesService';
import spinnerSvc from '../../utils/loader-service';
import { Article } from '../../types';

jest.mock('../../services/NewsApiService');
jest.mock('../../services/GurdianApiService');
jest.mock('../../services/NYTimesService');
jest.mock('../../utils/loader-service');
jest.mock('../../services/localStorage');
jest.mock('../../hooks/useCategories');

describe('Home Component', () => {
  const mockArticles: Article[] = [
    {
      title: 'Test Article 1',
      description: 'Description 1',
      url: 'http://test.com/1',
      imageUrl: 'http://test.com/1.jpg',
      source: 'Test Source',
      publishedAt: '2024-08-10',
    },
    {
      title: 'Test Article 2',
      description: 'Description 2',
      url: 'http://test.com/2',
      imageUrl: 'http://test.com/2.jpg',
      source: 'Test Source',
      publishedAt: '2024-08-11',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (NewsApiService.fetchFromNewsAPI as jest.Mock).mockResolvedValue(
      mockArticles
    );
    (GurdianApiService.fetchArticles as jest.Mock).mockResolvedValue(
      mockArticles
    );
    (NYTimesService.fetchArticles as jest.Mock).mockResolvedValue(
      mockArticles
    );
  });

  test('renders the Home component and fetches articles', async () => {
    render(<Home />);

    expect(screen.getByText(/Top Headlines/i)).toBeInTheDocument();
    expect(spinnerSvc.start).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
    });

    expect(spinnerSvc.stop).toHaveBeenCalled();
  });

  test('searches for articles when the search button is clicked', async () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText('Search articles...');
    const searchButton = screen.getByText(/Search/i);

    fireEvent.change(searchInput, { target: { value: 'React' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(NewsApiService.fetchFromNewsAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          keyword: 'React',
        })
      );
    });
  });

  test('applies filters and fetches articles', async () => {
    render(<Home />);

    const filterButton = screen.getByText(/Apply Filters/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(NewsApiService.fetchFromNewsAPI).toHaveBeenCalled();
      expect(GurdianApiService.fetchArticles).toHaveBeenCalled();
      expect(NYTimesService.fetchArticles).toHaveBeenCalled();
    });
  });
});
