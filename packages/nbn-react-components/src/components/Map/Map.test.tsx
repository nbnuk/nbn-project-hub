
import { render, screen } from '@testing-library/react';
import Map from './Map';

test('Species in legend control', () => {
  render( <Map species={'Maniola jurtina'} year={2020} /> );
  const linkElement = screen.getByText(/Maniola jurtina/i);
  expect(linkElement).toBeInTheDocument();
});
