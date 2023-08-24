// Externals
import React from 'react';
import { render } from '@testing-library/react';

// Components
import Loader from './Loader';

describe('Loader', () => {
  it('renders the loader with the correct data-testid', () => {
    const { getByTestId } = render(<Loader dataTestId="loader-test" />);
    const loaderElement = getByTestId('loader-test');
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders the circle element with the correct attributes', () => {
    const { getByTestId } = render(<Loader dataTestId="loader-test" />);
    const circleElement = getByTestId('loader-test').querySelector('circle');
    
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute('cx', '25');
    expect(circleElement).toHaveAttribute('cy', '25');
    expect(circleElement).toHaveAttribute('r', '20');
    expect(circleElement).toHaveAttribute('fill', 'none');
    expect(circleElement).toHaveAttribute('stroke-width', '5');
  });
});
