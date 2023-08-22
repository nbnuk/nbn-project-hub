import { render } from '@testing-library/react';
import { OccurrenceList, OccurrenceListProps } from './OccurrenceList';
import '@testing-library/jest-dom/extend-expect';

describe('OccurrenceList', () => {
  const defaultProps: OccurrenceListProps = {
    label: 'default label',
  };

  it('renders correctly', () => {
    const { getByText } = render(<OccurrenceList {...defaultProps} />);
    expect(getByText(defaultProps.label)).toBeInTheDocument();
  });

 
  // Other tests can be placed here...
});
