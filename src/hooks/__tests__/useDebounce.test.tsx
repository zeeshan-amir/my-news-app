import React from 'react';
import { render, screen, act } from '@testing-library/react';
import useDebounce from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce Hook', () => {
  const TestComponent: React.FC<{ value: string; delay: number }> = ({ value, delay }) => {
    const debouncedValue = useDebounce(value, delay);
    return <div data-testid="debounced-value">{debouncedValue}</div>;
  };

  test('should return the initial value immediately', () => {
    render(<TestComponent value="initial" delay={500} />);
    const debouncedValueElement = screen.getByTestId('debounced-value');
    expect(debouncedValueElement.textContent).toBe('initial');
  });

  test('should update the value after the delay', () => {
    const { rerender } = render(<TestComponent value="initial" delay={500} />);

    rerender(<TestComponent value="updated" delay={500} />);
    const debouncedValueElement = screen.getByTestId('debounced-value');

    expect(debouncedValueElement.textContent).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(debouncedValueElement.textContent).toBe('updated');
  });

  test('should cancel the previous timeout if value changes within the delay', () => {
    const { rerender } = render(<TestComponent value="initial" delay={500} />);

    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    const debouncedValueElement = screen.getByTestId('debounced-value');
    expect(debouncedValueElement.textContent).toBe('initial');

    rerender(<TestComponent value="updated again" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(debouncedValueElement.textContent).toBe('updated again');
  });
});
