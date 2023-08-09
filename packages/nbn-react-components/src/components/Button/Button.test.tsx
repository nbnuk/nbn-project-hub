import { render, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from './Button';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  const defaultProps: ButtonProps = {
    label: 'Test Button',
  };

  it('renders correctly', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    const props = { ...defaultProps, onClick: handleClick };
    const { getByText } = render(<Button {...props} />);

    fireEvent.click(getByText(defaultProps.label));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Other tests can be placed here...
});
