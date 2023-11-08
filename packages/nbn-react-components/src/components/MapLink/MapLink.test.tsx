import { render, screen } from '@testing-library/react';
import MapLink from './MapLink';

// Tests: terms
test('link - display', () => {
  render( <MapLink 
            tvk={'NBNSYS0000027783'}
          /> );
  const linkElement = screen.queryByText(/Open interactive map in new window/i);
  expect(linkElement).toBeInTheDocument();
});

test('terms - not display', () => {
    render( <MapLink 
              tvk={'NBNSYS0000027783'}
              link={'0'} 
            /> );
    const linkElement = screen.queryByText(/Open interactive map in new window/i);
    expect(linkElement).not.toBeInTheDocument();
});