import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './logo/Logo';

describe('Logo', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
