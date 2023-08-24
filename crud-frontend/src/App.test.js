// Externals
import { render, fireEvent, waitFor } from '@testing-library/react';

// Components
import App from './App';

// Constants
import { MOCK_API_DELAY_MS, SUCCESS_RESPONSE, ERROR_RESPONSE } from './constants';

// Mock data
const mockAPIDataSuccess = {
  _type: SUCCESS_RESPONSE,
  webPages: {
    value: [
      {
        id: "https://api.bing.microsoft.com/api/v7/#WebPages.0",
        name: "Amazon.com. Spend less. Smile more.",
        url: "https://www.amazon.com/",
        snippet: "Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals on the largest selection of everyday essentials and other products, including fashion, home, beauty, electronics, Alexa Devices, sporting goods, toys, automotive, pets, baby, books, video games, musical instruments, office supplies, and more.",
      },
      {
        id: "https://api.bing.microsoft.com/api/v7/#WebPages.1",
        name: "Welcome to Amazon Customer Service",
        url: "https://www.amazon.com/gp/help/customer/display.html",
        snippet: "Visit the Amazon Customer Service site to find answers to common problems, use online chat, or call customer service phone number at 1-888-280-4331 for support.",
      },
    ]
  }
}

const mockAPIDataFailure = {
  _type: ERROR_RESPONSE,
  errors: [
    {
      code: "InvalidRequest",
      subCode: "ParameterMissing",
      message: "Required parameter is missing.",
      parameter: "q"
    }
  ]
}

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run pending timers after each test
    jest.useRealTimers(); // Restore real timers
  });

  it('renders the App component', async () => {
    // Mocking a successful API response
    global.fetch.mockReturnValue(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () =>
              Promise.resolve(mockAPIDataSuccess),
          })
        }, MOCK_API_DELAY_MS)
      })
    );
    const { getByRole, getByPlaceholderText, queryByTestId } = render(<App />);

    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Search' } });

    // Call the API once
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Wait for the mock API call to resolve
    await waitFor(() => {
      expect(queryByTestId('loader')).toBeNull();
    });

    expect(getByRole('link',{ name: /Amazon.com. Spend less. Smile more./i })).toBeInTheDocument();
  });

  it('handles API error', async () => {
    // Mocking a failed API response
    global.fetch.mockReturnValue(
      new Promise((_, reject) => {
        setTimeout(() => {
          reject({
            json: () =>
              Promise.reject(mockAPIDataFailure),
          })
        }, MOCK_API_DELAY_MS)
      })
    );

    const { getByPlaceholderText, queryByTestId, getByRole } = render(<App />);

    const input = getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Error testing' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(queryByTestId('loader')).toBeNull();
    });

    expect(getByRole('alert', { content: /Required parameter is missing/i })).toBeInTheDocument();
  });
});

