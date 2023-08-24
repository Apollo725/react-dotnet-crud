// Externals
import React from 'react';
import { render } from '@testing-library/react';

// Components
import List from './List';

jest.mock('../ListItem', () => {
  return function MockListItem(props) {
    return <div data-testid="mock-list-item">{props.listItem.id}</div>;
  };
});

describe('List', () => {
  it('renders a message when list is empty', () => {
    const { getByText } = render(<List list={[]} />);
    const messageElement = getByText('No results found!');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders a list of items', () => {
    const mockList = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
    ];
    const { getAllByTestId } = render(<List list={mockList} />);
    const listItemElements = getAllByTestId('mock-list-item');
    expect(listItemElements).toHaveLength(2);
  });
});
