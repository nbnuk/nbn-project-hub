import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import useSWR from 'swr';

import { getSpeciesNameUrl, speciesNameFetcher } from '../../lib/nameutils';
import { TableAcceptedName, TableCommonNames, TableSynonyms } from './names';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#names

// -----------------------------------------------------------------------------

interface ISpeciesNames {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesNames({ tvk }: ISpeciesNames): JSX.Element {

    const searchUrl: string = getSpeciesNameUrl(tvk);
    const { data, error, isLoading } = useSWR(searchUrl, speciesNameFetcher, 
                                        {revalidateOnFocus: false});

    return (
      <>
        {(isLoading) ? (<CircularProgress />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (data) ? (
                <>
                <Typography variant='h5'>Names and sources</Typography>
                <br></br>
                <TableAcceptedName {...data.taxonConcept}></TableAcceptedName>
                <br></br>
                <TableSynonyms {...data}></TableSynonyms>
                <br></br>
                <TableCommonNames {...data}></TableCommonNames>                
                </>
            ) : null)
        }
      </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


