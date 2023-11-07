import { useMemo } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import useSWR from 'swr';

import { getSpeciesNameUrl, makeTaxonomy, ITaxon, speciesNameFetcher } 
            from '../../lib/nameutils';
import { TaxonBreadcrumb } from './classifications';

// -----------------------------------------------------------------------------

interface ISpeciesClassBreadcrumb {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesClassBreadcrumb({ tvk }: ISpeciesClassBreadcrumb): JSX.Element {

    const searchUrl: string = getSpeciesNameUrl(tvk);
    const { data, error, isLoading } = useSWR(searchUrl, speciesNameFetcher, { revalidateOnFocus: false });
    // Map returned data to a format suitable for display
    const taxonomy: ITaxon[] = useMemo(() => makeTaxonomy(data), [data]);

    return (
        <>
        {(isLoading) ? (<CircularProgress />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (data) ? (
                <>
                <TaxonBreadcrumb taxons={taxonomy}></TaxonBreadcrumb>            
                <br />
                </>
            ) : null)
        }
    </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


