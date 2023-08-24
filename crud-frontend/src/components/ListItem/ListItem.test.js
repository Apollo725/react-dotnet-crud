// Externals
import React from 'react';
import { render } from '@testing-library/react';

// Components
import ListItem from './ListItem';

describe('ListItem', () => {
  const mockListItem = {
    name: 'Test name',
    url: 'https://test.com',
    snippet: 'Test snippet',
  };

  it('renders the name and snippet correctly', () => {
    const { getByText } = render(<ListItem listItem={mockListItem} />);
    const nameElement = getByText('Test name');
    const snippetElement = getByText('Test snippet');
    expect(nameElement).toBeInTheDocument();
    expect(snippetElement).toBeInTheDocument();
  });

  it('renders a link with the correct URL', () => {
    const { getByText } = render(<ListItem listItem={mockListItem} />);
    const linkElement = getByText('Test name');
    expect(linkElement).toHaveAttribute('href', 'https://test.com');
  });
});
