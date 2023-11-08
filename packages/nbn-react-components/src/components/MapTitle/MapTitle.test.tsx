
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import { render, screen } from '@testing-library/react';
import MapTitle from './MapTitle';

// Tests: terms
test('terms - display', () => {
  render( <MapTitle 
            tvk={'NBNSYS0000027783'}
          /> );
  const linkElement = screen.queryByText(/The National Biodiversity Network records are shown on the map below/i);
  expect(linkElement).toBeInTheDocument();
});

test('terms - not display', () => {
    render( <MapTitle 
              tvk={'NBNSYS0000027783'}
              terms={'0'} 
            /> );
    const linkElement = screen.queryByText(/The National Biodiversity Network records are shown on the map below/i);
    expect(linkElement).not.toBeInTheDocument();
});