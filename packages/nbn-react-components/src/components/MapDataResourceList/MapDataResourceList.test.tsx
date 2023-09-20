import { render, screen } from '@testing-library/react';
import MapDataResourceList from './MapDataResourceList';
import { useDataResource } from '../../lib/advanced/hooks/useDataResource';

jest.mock('../../lib/advanced/hooks/useDataResource');

const mockedUseDataResource = useDataResource as jest.Mock;
mockedUseDataResource.mockReturnValue({
  dataResources: [
    { uid: 'dr867', 
      name: 'Suffolk Biodiversity Information Service (SBIS) Dataset'
    },
    { uid: 'dr855', 
      name: 'All taxa records for Leicestershire and Rutland'
    },      
  ],
  error: null,
  isValidating: false,
});  

// Tests: ref
test('refs - display', () => {
  render( <MapDataResourceList 
            tvk={'NHMSYS0001387317'}
            ds={'dr867,dr855'}

          /> );
  const elem = screen.queryByText(/All taxa records for Leicestershire and Rutland/i);
  expect(elem).toBeInTheDocument();
});

test('refs - not display', () => {
  render( <MapDataResourceList 
            tvk={'NHMSYS0001387317'}
            refs={'0'}
            ds={'dr867,dr855'}

          /> );
  const elem = screen.queryByText(/All taxa records for Leicestershire and Rutland/i);
  expect(elem).not.toBeInTheDocument();
});