// @ts-ignore
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  test('renders the logo with correct link', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const logo = screen.getByText(/News Aggregator/i);
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  test('menu is hidden by default on small screens', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('hidden');
  });

  test('toggles the menu on button click', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const navElement = screen.getByRole('navigation');
    expect(navElement).not.toHaveClass('hidden');
  });

  test('menu links are visible on larger screens by default', () => {
    window.innerWidth = 1024;
    render(
      <Router>
        <Header />
      </Router>
    );

    const homeLink = screen.getByText(/Home/i);
    const preferencesLink = screen.getByText(/Preferences/i);

    expect(homeLink).toBeVisible();
    expect(preferencesLink).toBeVisible();
  });
});
