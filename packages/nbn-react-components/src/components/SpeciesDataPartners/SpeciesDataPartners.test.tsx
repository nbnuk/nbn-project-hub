import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { default as SpeciesDataPartners } from './SpeciesDataPartners';

// -----------------------------------------------------------------------------
// Setup data mock

import { useDataPartners } from '../../shared/hooks/nbn-atlas-api/useDataPartners';
jest.mock('../../shared/hooks/nbn-atlas-api/useDataPartners');
const mockedDataPartners = useDataPartners as jest.Mock;

mockedDataPartners.mockReturnValue({
    data: [
        { count: 888392,
          name: 'Butterfly distribution records for the UK from Butterfly Conservation, up to 2019', 
          uid: 'dr2981', 
          urn: 'https://registry.nbnatlas.org/ws/dataResource/dr2981', 
        },
        { count: 206629,
          name: 'UK Butterfly Monitoring Scheme (UKBMS)', 
          uid: 'dr1206', 
          urn: 'https://registry.nbnatlas.org/ws/dataResource/dr1206', 
        },
    ],
    error: null,
    isLoading: false,
}); 

// -----------------------------------------------------------------------------
// Tests

test('Table contents', () => {
    render( <SpeciesDataPartners 
              tvk={'NHMSYS0000504624'}
            /> );

    // screen.debug();
    let elem = screen.getByText('UK Butterfly Monitoring Scheme (UKBMS)');
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveAttribute('href', 'https://registry.nbnatlas.org/public/show/dr1206');
    elem = screen.getByText('206,629');
    expect(elem).toBeInTheDocument();    
});

test('Error', () => {
    mockedDataPartners.mockReturnValue({
        data: null,
        error: true,
        isLoading: false,
    });
    render( <SpeciesDataPartners 
                tvk={'NHMSYS0000504624'}
            /> );
    const elem = screen.queryByText(/Error fetching data/i);
    expect(elem).toBeInTheDocument();
});

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
