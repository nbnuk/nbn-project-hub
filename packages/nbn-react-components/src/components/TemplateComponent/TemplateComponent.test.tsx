import { render } from '@testing-library/react';
import { TemplateComponent, TemplateComponentProps } from './TemplateComponent';
import '@testing-library/jest-dom/extend-expect';

describe('TemplateComponent', () => {
  const defaultProps: TemplateComponentProps = {
    label: 'default label',
  };

  it('renders correctly', () => {
    const { getByText } = render(<TemplateComponent {...defaultProps} />);
    expect(getByText(defaultProps.label)).toBeInTheDocument();
  });

 
  // Other tests can be placed here...
});
