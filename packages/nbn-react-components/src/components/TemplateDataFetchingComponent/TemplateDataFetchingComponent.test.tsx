import { render } from '@testing-library/react';
import TemplateDataFetchingComponent from './TemplateDataFetchingComponent';
import * as swr from 'swr';

jest.mock('swr');

const mockedSWR = swr.default as jest.Mock;

test('renders data when useSWR returns data', () => {
  // Mock the useSWR hook to return some predefined data
  mockedSWR.mockReturnValue({
    data: [{ id: 1, userId: 1, title: 'Test title', completed: false }],
    error: null,
    isValidating: false,
  });

  const { getByText } = render(<TemplateDataFetchingComponent apiURL="https://jsonplaceholder.typicode.com/todos"/>);

  expect(getByText('1')).toBeInTheDocument();
  expect(getByText('Test title')).toBeInTheDocument();
});



test('renders error when useSWR returns error', () => {
  // Mock the useSWR hook to return an error
  mockedSWR.mockReturnValue({
    data: null,
    error: new Error('Test error'),
    isValidating: false,
  });

  const { getByText } = render(<TemplateDataFetchingComponent apiURL="https://jsonplaceholder.typicode.com/todos"/>);

  expect(getByText('Error: Test error')).toBeInTheDocument();
});

test('renders loading when useSWR is validating', () => {
  // Mock the useSWR hook to return isValidating: true
  mockedSWR.mockReturnValue({
    data: null,
    error: null,
    isValidating: true,
  });

  const { getByText } = render(<TemplateDataFetchingComponent apiURL="https://jsonplaceholder.typicode.com/todos"/>);

  expect(getByText('Loading...')).toBeInTheDocument();
});
