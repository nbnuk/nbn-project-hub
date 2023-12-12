import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as SpeciesLiterature } from './SpeciesLiterature';

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

//------
import { useCEL } from '../../shared/hooks/nbn-atlas-api/useCEL';
jest.mock('../../shared/hooks/nbn-atlas-api/useCEL');
const mockedUseCEL = useCEL as jest.Mock;

mockedUseCEL.mockReturnValue({
    data: {
      total_results: 1,
      results: [
          {
             title: 'Convert to organic farming',
             url: 'https://www.conservationevidence.com/actions/3907',
          },
      ],
    },
    error: null,
    isLoading: false,
});
// -----------------------------------------------------------------------------
// Tests

test('Literature', () => {
    render( <SpeciesLiterature 
              tvk={'NHMSYS0000504624'}
            /> );
    // screen.debug();
    let elem = screen.queryByText(/Vanessa atalanta/i);
    expect(elem).toBeInTheDocument();
    elem = screen.queryByText(/Convert to organic farming/i);
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveAttribute('href', 'https://www.conservationevidence.com/actions/3907');
});

test('Error', () => {
  mockedUseSpeciesNames.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  mockedUseCEL.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <SpeciesLiterature 
            tvk={'NHMSYS0000504624'}
          /> );
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
