import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../ArticleCard';
import { Article } from '../../types';

describe('ArticleCard Component', () => {
  const articleWithImage: Article = {
    title: 'Test Article',
    description: 'This is a test description.',
    source: 'Test Source',
    publishedAt: '2024-08-16T00:00:00Z',
    url: 'https://example.com',
    imageUrl: 'https://example.com/test-image.jpg',
  };

  const articleWithoutImage: Article = {
    title: 'Test Article Without Image',
    description: 'This is a test description without an image.',
    source: 'Test Source',
    publishedAt: '2024-08-16T00:00:00Z',
    url: 'https://example.com',
    imageUrl: '',
  };

  test('renders article with image', () => {
    render(<ArticleCard article={articleWithImage} />);

    const titleElement = screen.getByText(/Test Article/i);
    const descriptionElement = screen.getByText(/This is a test description./i);
    const sourceElement = screen.getByText(/Test Source - 8\/16\/2024/i);
    const imageElement = screen.getByAltText(/Test Article/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(sourceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('renders article without image', () => {
    render(<ArticleCard article={articleWithoutImage} />);

    const titleElement = screen.getByText(/Test Article Without Image/i);
    const descriptionElement = screen.getByText(/This is a test description without an image./i);
    const sourceElement = screen.getByText(/Test Source - 8\/16\/2024/i);
    const imageElement = screen.getByAltText(/No Image found/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(sourceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', './public/assets/no-image-found.svg');
  });

  test('renders correct link', () => {
    render(<ArticleCard article={articleWithImage} />);

    const linkElement = screen.getByRole('link', { name: /Read More/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });
});
