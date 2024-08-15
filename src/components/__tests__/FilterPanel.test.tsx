// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPanel from '../FilterPanel';
import { Option, ConfigurationState } from '../../types';
import preferencesStorageService from '../../services/localStorage';

jest.mock('../../services/localStorage');

const mockOnFilter = jest.fn();

describe('FilterPanel Component', () => {
  const mockPreferences: ConfigurationState = {
    sources: [{ value: 'source1', label: 'Source 1' }] as Option[],
    categories: { value: 'category1', label: 'Category 1' } as Option,
    author: '',
  };

  beforeEach(() => {
    (preferencesStorageService.get as jest.Mock).mockReturnValue(mockPreferences);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders FilterPanel with default preferences', () => {
    render(<FilterPanel onFilter={mockOnFilter} />);

    const categoryInput = screen.getByText(/Category 1/i);
    const sourceInput = screen.getByText(/Source 1/i);

    expect(categoryInput).toBeInTheDocument();
    expect(sourceInput).toBeInTheDocument();
  });

  test('handles filter button click', () => {
    render(<FilterPanel onFilter={mockOnFilter} />);

    const fromDateInput = screen.getByPlaceholderText(/From Date/i);
    const toDateInput = screen.getByPlaceholderText(/To Date/i);

    fireEvent.change(fromDateInput, { target: { value: '2024-08-01' } });
    fireEvent.change(toDateInput, { target: { value: '2024-08-31' } });

    const applyButton = screen.getByText(/Apply Filters/i);
    fireEvent.click(applyButton);

    expect(mockOnFilter).toHaveBeenCalledWith({
      fromDate: '2024-08-01',
      toDate: '2024-08-31',
      category: mockPreferences.categories,
      source: mockPreferences.sources,
      author: '',
    });
  });

  test('disables category select input when no sources are selected', () => {
    (preferencesStorageService.get as jest.Mock).mockReturnValueOnce(null);

    render(<FilterPanel onFilter={mockOnFilter} />);

    const categoryInput = screen.getByPlaceholderText(/Select Category/i);
    expect(categoryInput).toBeDisabled();
  });

  test('disables source select input when preferences already set', () => {
    render(<FilterPanel onFilter={mockOnFilter} />);

    const sourceInput = screen.getByText(/Source 1/i);
    expect(sourceInput.closest('input')).toBeDisabled();
  });
});
