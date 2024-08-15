// import React from 'react';
import { render, screen } from '@testing-library/react';
import Preferences from '../Preferences';
import preferencesStorageService from '../../services/localStorage';
import { ConfigurationState, Option } from '../../types';

jest.mock('../../services/localStorage');

const mockSources: Option[] = [
  { value: 'source1', label: 'Source 1' },
  { value: 'source2', label: 'Source 2' },
];

const mockCategories: Option[] = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

jest.mock('../../hooks/useCategories', () => {
  return jest.fn(() => ({
    sources: mockSources,
    categories: mockCategories[0],
    availableCategories: mockCategories,
    handleSourcesChange: jest.fn(),
    handleCategoriesChange: jest.fn(),
  }));
});

describe('Preferences Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input for authors', () => {
    const mockStoredPreferences: ConfigurationState = {
      sources: mockSources,
      categories: mockCategories[0],
      author: 'John Doe',
    };

    (preferencesStorageService.get as jest.Mock).mockReturnValue(mockStoredPreferences);

    render(<Preferences />);

    const authorInput = screen.getByPlaceholderText('Enter authors');
    expect(authorInput).toBeInTheDocument();
  });
});
