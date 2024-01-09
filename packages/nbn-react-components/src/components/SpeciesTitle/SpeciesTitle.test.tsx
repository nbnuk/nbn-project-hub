import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as SpeciesTitle } from './SpeciesTitle';

// -----------------------------------------------------------------------------
// Setup data mock

import useSWR from 'swr';
jest.mock('swr');

const mockedUseSWR = useSWR as jest.Mock;
mockedUseSWR.mockReturnValue({
  data: {
    taxonConcept: {
        nameComplete: 'Vanessa atalanta (Linnaeus, 1758)',
    },
    commonNames: [
        {
           nameString: 'Red Admiral',
        },
    ],
  },
  error: null,
  isLoading: false,
});  

// -----------------------------------------------------------------------------
// Tests

test('Names', () => {
    render( <SpeciesTitle 
              tvk={'NHMSYS0000504624'}
            /> );
    // screen.debug();
    let elem = screen.queryByText(/Vanessa atalanta/i);
    expect(elem).toBeInTheDocument();
    elem = screen.queryByText(/Red Admiral/i);
    expect(elem).toBeInTheDocument();
});

test('Error', () => {
  mockedUseSWR.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <SpeciesTitle 
            tvk={'NHMSYS0000504624'}
          /> );
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
