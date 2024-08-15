import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import useCategories from '../useCategories';
import GurdianApiService from '../../services/GurdianApiService';
import spinnerSvc from '../../utils/loader-service';
import { Option } from '../../types';

jest.mock('../../services/GurdianApiService');
jest.mock('../../utils/loader-service');

const mockGuardianCategories: Option[] = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

describe('useCategories Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent: React.FC = () => {
    const {
      categories,
      availableCategories,
      handleSourcesChange,
      handleCategoriesChange,
    } = useCategories();

    return (
      <div>
        <div data-testid="categories">{JSON.stringify(categories)}</div>
        <div data-testid="available-categories">
          {JSON.stringify(availableCategories)}
        </div>
        <button
          data-testid="change-sources"
          onClick={() =>
            handleSourcesChange([{ value: 'Gurdian-Api', label: 'Gurdian Api' }])
          }
        >
          Change Sources
        </button>
        <button
          data-testid="change-categories"
          onClick={() =>
            handleCategoriesChange({ value: 'category1', label: 'Category 1' })
          }
        >
          Change Categories
        </button>
      </div>
    );
  };

  test('should fetch Guardian categories on mount', async () => {
    (GurdianApiService.fetchGuardianTags as jest.Mock).mockResolvedValue(
      mockGuardianCategories
    );

    await act(async () => {
      render(<TestComponent />);
    });

    expect(spinnerSvc.start).toHaveBeenCalled();
    expect(spinnerSvc.stop).toHaveBeenCalled();
    expect(GurdianApiService.fetchGuardianTags).toHaveBeenCalled();
    expect(screen.getByTestId('available-categories').textContent).toContain(
      'Category 1'
    );
  });

  test('should update available categories when sources change', async () => {
    (GurdianApiService.fetchGuardianTags as jest.Mock).mockResolvedValue(
      mockGuardianCategories
    );

    await act(async () => {
      render(<TestComponent />);
    });

    const changeSourcesButton = screen.getByTestId('change-sources');
    act(() => {
      changeSourcesButton.click();
    });

    expect(screen.getByTestId('available-categories').textContent).toContain(
      'Category 1'
    );
  });

  test('should update categories when handleCategoriesChange is called', async () => {
    (GurdianApiService.fetchGuardianTags as jest.Mock).mockResolvedValue(
      mockGuardianCategories
    );

    await act(async () => {
      render(<TestComponent />);
    });

    const changeCategoriesButton = screen.getByTestId('change-categories');
    act(() => {
      changeCategoriesButton.click();
    });

    expect(screen.getByTestId('categories').textContent).toContain(
      'Category 1'
    );
  });
});
