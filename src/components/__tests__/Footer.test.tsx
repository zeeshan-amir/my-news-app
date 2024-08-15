// @ts-ignore
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders the footer with correct text', () => {
    render(<Footer />);

    // Check if the footer text is rendered
    const footerText = screen.getByText(/© 2024 News Aggregator. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  test('footer has correct styling', () => {
    render(<Footer />);

    // Check if the footer has the correct classes
    const footerElement = screen.getByText(/© 2024 News Aggregator. All rights reserved./i).closest('footer');
    expect(footerElement).toHaveClass('bg-gray-800', 'text-white', 'text-center', 'p-4', 'mt-8');
  });
});
