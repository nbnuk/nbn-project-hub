import { render, screen } from '@testing-library/react';
import SimpleDataResourceList from './SimpleDataResourceList';
import { useDataResource } from '../../lib/advanced/hooks/useDataResource';

jest.mock('../../lib/advanced/hooks/useDataResource');

const mockedUseDataResource = useDataResource as jest.Mock;

test('renders data when useSWR returns data', () => {
  // Mock the useDataResource hook to return some predefined data
  mockedUseDataResource.mockReturnValue({
    dataResources: [{ uid: 1, name: 'data resource 1', urn: 'https://registry.nbnatlas.org/ws/dataResource/dr2909' }],
    error: null,
    isValidating: false,
  });

  const { getByText } = render(<SimpleDataResourceList apiOccurrenceSearchURL="https://records-ws.nbnatlas.org/occurrences/search?q=*:*"/>);
  console.log(getByText);
  expect(getByText('data resource 1')).toBeInTheDocument();
  // expect(getByText('urn: https://registry.nbnatlas.org/ws/dataResource/dr2909')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'data resource 1' })).toHaveAttribute('href', 'https://registry.nbnatlas.org/ws/dataResource/dr2909');
});



test('renders error when useSWR returns error', () => {
  // Mock the useDataResource hook to return an error
  mockedUseDataResource.mockReturnValue({
    data: null,
    error: new Error('Test error'),
    isValidating: false,
  });

  const { getByText } = render(<SimpleDataResourceList apiOccurrenceSearchURL="https://records-ws.nbnatlas.org/occurrences/search?q=*:*"/>);

  expect(getByText('Error: Test error')).toBeInTheDocument();
});

test('renders loading when useSWR is validating', () => {
  // Mock the useDataResource hook to return isValidating: true
  mockedUseDataResource.mockReturnValue({
    data: null,
    error: null,
    isValidating: true,
  });

  const { getByText } = render(<SimpleDataResourceList apiOccurrenceSearchURL="https://records-ws.nbnatlas.org/occurrences/search?q=*:*"/>);

  expect(getByText('Loading...')).toBeInTheDocument();
});
