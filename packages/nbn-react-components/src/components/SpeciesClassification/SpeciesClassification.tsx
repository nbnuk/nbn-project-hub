import { useMemo } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import useSWR from 'swr';

import { getSpeciesNameUrl, makeTaxonomy, ITaxon, speciesNameFetcher } from '../../lib/nameutils';
import { TaxonList } from './classifications';

// Example page:
// https://species.nbnatlas.org/species/NHMSYS0000504624#classification

// -----------------------------------------------------------------------------

interface ISpeciesClassification {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesClassification({ tvk }: ISpeciesClassification): JSX.Element {

    const searchUrl: string = getSpeciesNameUrl(tvk);
    const { data, error, isLoading } = useSWR(searchUrl, speciesNameFetcher, { revalidateOnFocus: false });
    // Transform data returned from API call to a format suitable for display.
    const taxonomy: ITaxon[] = useMemo(() => makeTaxonomy(data), [data]);
    
    return (
        <>
        {(isLoading) ? (<CircularProgress />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (data) ? (
                <>
                <Typography variant='h5'>Classification</Typography>
                <br></br>
                <TaxonList taxons={taxonomy}></TaxonList>            
                </>
            ) : null)
        }
    </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


