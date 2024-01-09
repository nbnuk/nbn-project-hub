import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as SpeciesClassification } from './SpeciesClassification';
import { default as SpeciesClassBreadcrumb } from './SpeciesBreadcrumb';

// -----------------------------------------------------------------------------
// Setup data mock
import useSWR from 'swr';
jest.mock('swr');

const mockedUseSWR = useSWR as jest.Mock;
mockedUseSWR.mockReturnValue({
  data: {
    classification: {
        kingdom: 'Animalia',
        phylum: 'Arthropoda',
        phylumGuid: 'NHMSYS0020470198',
        superfamily: 'Papilionoidea',
        superfamilyGuid: 'NHMSYS0000503590',
        species: 'Vanessa atalanta',
        speciesGuid: 'NHMSYS0000504624'
    },
  },
  error: null,
  isLoading: false,
});  
// -----------------------------------------------------------------------------

// Tests
test('Classification - Vertical', () => {
    render( <SpeciesClassification 
              tvk={'NHMSYS0000504624'}
            /> );
    let elem = screen.queryByText(/Papilionoidea/i);
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveAttribute('href', 'https://species.nbnatlas.org/species/NHMSYS0000503590#classification');
    elem = screen.queryByText(/Arthropoda/i);
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveAttribute('href', 'https://species.nbnatlas.org/species/NHMSYS0020470198#classification');
});

test('Classification - Breadcrumb', () => {
  render( <SpeciesClassBreadcrumb 
            tvk={'NHMSYS0000504624'}
          /> );
  let elem = screen.queryByText(/Papilionoidea/i);
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveAttribute('href', 'https://species.nbnatlas.org/species/NHMSYS0000503590#classification');
  elem = screen.queryByText(/Arthropoda/i);
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveAttribute('href', 'https://species.nbnatlas.org/species/NHMSYS0020470198#classification');
});

test('Error - Vertical', () => {
  mockedUseSWR.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <SpeciesClassification 
            tvk={'NHMSYS0000504624'}
          /> );
  // screen.debug();
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

test('Error - Breaccrumb', () => {
  mockedUseSWR.mockReturnValue({
    data: null,
    error: true,
    isLoading: false,
  });
  render( <SpeciesClassBreadcrumb 
            tvk={'NHMSYS0000504624'}
          /> );
  // screen.debug();
  const elem = screen.queryByText(/Error fetching data/i);
  expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
