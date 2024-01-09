import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as ExplorePage } from './ExplorePage';

// -----------------------------------------------------------------------------
// Setup data mock

import useSWR from 'swr';
jest.mock('swr');

const mockedUseSWR = useSWR as jest.Mock;

// -----------------------------------------------------------------------------
// Tests

/*
test('Names', () => {
    render( <ExplorePage 
              tvk={'NHMSYS0000504624'}
            /> );
    // screen.debug();
    let elem = screen.queryByText(/Vanessa atalanta/i);
    expect(elem).toBeInTheDocument();
    elem = screen.queryByText(/Red Admiral/i);
    expect(elem).toBeInTheDocument();
});
*/

test('Error', () => {
  mockedUseSWR.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <ExplorePage 

    /> );
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
