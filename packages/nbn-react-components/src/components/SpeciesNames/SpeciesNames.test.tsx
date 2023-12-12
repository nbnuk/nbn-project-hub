import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as SpeciesNames } from './SpeciesNames';

// -----------------------------------------------------------------------------
// Setup data mocks

import { useSpeciesNames } from '../../shared/hooks/nbn-atlas-api/useSpeciesNames';
jest.mock('../../shared/hooks/nbn-atlas-api/useSpeciesNames');
const mockedUseSpeciesNames = useSpeciesNames as jest.Mock;

mockedUseSpeciesNames.mockReturnValue({
  data: {
    taxonConcept: {
        nameComplete: 'Vanessa atalanta (Linnaeus, 1758)',
    },
    commonNames: [
        {
           nameString: 'Red Admiral',
        },
    ],
    synonyms: [
        {
           nameString: 'Red Synonym',
        },
    ],
    classification: {
        scientificName: 'Vanessa atalanta',
    },
  },
  error: null,
  isLoading: false,
});  

// -----------------------------------------------------------------------------
// Tests

test('Literature', () => {
    render( <SpeciesNames 
              tvk={'NHMSYS0000504624'}
            /> );
    // screen.debug();
    const elem = screen.queryByText(/Vanessa atalanta/i);
    expect(elem).toBeInTheDocument();
});

test('Error', () => {
  mockedUseSpeciesNames.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <SpeciesNames 
            tvk={'NHMSYS0000504624'}
          /> );
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
