import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleList from '../ArticleList';
import { Article } from '../../types';

describe('ArticleList Component', () => {
  const articles: Article[] = [
    {
      title: 'Test Article 1',
      description: 'This is the first test article.',
      source: 'Test Source 1',
      publishedAt: '2024-08-16T00:00:00Z',
      url: 'https://example.com/1',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      title: 'Test Article 2',
      description: 'This is the second test article.',
      source: 'Test Source 2',
      publishedAt: '2024-08-17T00:00:00Z',
      url: 'https://example.com/2',
      imageUrl: 'https://example.com/image2.jpg',
    },
  ];

  test('renders the correct number of ArticleCard components', () => {
    render(<ArticleList articles={articles} />);

    const titleElements = articles.map(article => screen.getByText(article.title));
    
    expect(titleElements).toHaveLength(2);
  });

  test('renders ArticleCard components with correct content', () => {
    render(<ArticleList articles={articles} />);

    articles.forEach((article) => {
      const titleElement = screen.getByText(article.title);
      const descriptionElement = screen.getByText(article.description);
      const sourceElement = screen.getByText(`${article.source} - ${new Date(article.publishedAt).toLocaleDateString()}`);

      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
      expect(sourceElement).toBeInTheDocument();
    });
  });

  test('renders correctly with an empty articles array', () => {
    render(<ArticleList articles={[]} />);

    const articleTitles = articles.map(article => screen.queryByText(article.title));
    articleTitles.forEach(title => {
      expect(title).not.toBeInTheDocument();
    });
  });
});
