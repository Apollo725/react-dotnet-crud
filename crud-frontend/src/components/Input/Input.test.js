// Externals
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

// Components
import Input from './Input';

// Mock the debounce function to immediately execute the debounced function
jest.mock('debounce', () => (fn) => fn);

describe('Input', () => {
  it('calls sendRequest with debounced value on input change', async () => {
    const mockSendRequest = jest.fn();
    const { getByPlaceholderText } = render(<Input sendRequest={mockSendRequest} />);

    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Search term' } });

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalledWith('Search term');
    });
  });

  it('renders the input with placeholder', () => {
    const placeholderText = 'Enter your search';
    const { getByPlaceholderText } = render(<Input placeholder={placeholderText} />);
    const input = getByPlaceholderText(placeholderText);

    expect(input).toBeInTheDocument();
  });
});
