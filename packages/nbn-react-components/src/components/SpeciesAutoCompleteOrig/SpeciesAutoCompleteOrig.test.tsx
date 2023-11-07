import { render, screen } from '@testing-library/react';
import { SpeciesAutoCompleteOrig } from './SpeciesAutoCompleteOrig';
import * as swr from 'swr';

jest.mock('swr');

const mockedSWR = swr.default as jest.Mock;

test('renders data when useSWR returns data', () => {
  // Mock the useSWR hook to return some predefined data
  mockedSWR.mockReturnValue({
    data: {"autoCompleteList": [
      {"commonName":null,
      "commonNameMatches":[],
      "georeferencedCount":0,
      "guid":"NHMSYS0000544772",
      "matchedNames":["Tinca"],
      "name":"Tinca",
      "occurrenceCount":0,
      "rankID":6000,
      "rankString":"genus",
      "scientificNameMatches":["<b>Tinca<\\/b>"]
      },
      {"commonName":"Tench",
      "commonNameMatches":[],
      "georeferencedCount":0,
      "guid":"NHMSYS0000544773",
      "matchedNames":["Tinca tinca"],
      "name":"Tinca tinca",
      "occurrenceCount":0,
      "rankID":7000,
      "rankString":"species",
      "scientificNameMatches":["<b>Tinca<\\/b> tinca"]
      },
      {"commonName":null,
      "commonNameMatches":[],
      "georeferencedCount":0,
      "guid":"NHMSYS0000067449",
      "matchedNames":["Asymphylodora tincae"],
      "name":"Asymphylodora tincae",
      "occurrenceCount":0,
      "rankID":7000,
      "rankString":"species",
      "scientificNameMatches":["Asymphylodora <b>tinca<\\/b>e"]
      }]
    },
    error: null,
    isValidating: false,
  });

  render(<SpeciesAutoCompleteOrig 
           initialSearchQuery={'tinca'}
         />);

  let elem = screen.queryByText(/Tench/i);
  expect(elem).toBeInTheDocument();
  elem = screen.queryByText(/Asymphylodora tincae/i);
  expect(elem).toBeInTheDocument();
});

test('renders error when useSWR returns error', () => {
  // Mock the useSWR hook to return an error
  mockedSWR.mockReturnValue({
    data: null,
    error: new Error('Test error'),
    isValidating: false,
  });

  render(<SpeciesAutoCompleteOrig />);
  const elem = screen.queryByText(/Test error/i);
  expect(elem).toBeInTheDocument();
});

test('renders loading when useSWR is validating', () => {
  // Mock the useSWR hook to return isValidating: true
  mockedSWR.mockReturnValue({
    data: null,
    error: null,
    isValidating: true,
  });

  const { getByText } = render(<SpeciesAutoCompleteOrig />);

  expect(getByText('Loading...')).toBeInTheDocument();
});
