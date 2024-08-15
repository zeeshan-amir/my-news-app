import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading Component', () => {
  test('renders loading text', () => {
    render(<Loading />);

    // Check if the loading text is rendered
    const loadingText = screen.getByText(/Loading\.\.\./i);
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('text-center', 'text-xl', 'py-10');
  });
});
