import { render } from '@testing-library/react';

import LoadingSpinner from '../src/components/loading/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without errors', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });
  it('should render 8 balls', () => {
    const { container } = render(<LoadingSpinner />);
    const ball = container.querySelectorAll('[class^="ball-"]');
    expect(ball).toHaveLength(8);
  });
});
