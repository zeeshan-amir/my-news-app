import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockSetSearch = jest.fn();

  const setup = (searchValue = '') => {
    render(
      <SearchBar onSearch={mockOnSearch} setSearch={mockSetSearch} search={searchValue} />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and button', () => {
    setup();

    const inputElement = screen.getByPlaceholderText(/Search articles.../i);
    const buttonElement = screen.getByText(/Search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls setSearch on input change', () => {
    setup();

    const inputElement = screen.getByPlaceholderText(/Search articles.../i);
    fireEvent.change(inputElement, { target: { value: 'React' } });

    expect(mockSetSearch).toHaveBeenCalledWith('React');
  });

  test('calls onSearch with the correct value when the button is clicked', () => {
    setup('React Testing');

    const buttonElement = screen.getByText(/Search/i);
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('React Testing');
  });
});
