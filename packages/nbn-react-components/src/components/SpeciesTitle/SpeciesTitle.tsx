import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import useSWR from 'swr';

import { getSpeciesNameUrl, speciesNameFetcher } from '../../lib/nameutils';

// -----------------------------------------------------------------------------

interface ISpeciesTitle {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesTitle({ tvk }: ISpeciesTitle): JSX.Element {

    const searchUrl: string = getSpeciesNameUrl(tvk);
    const { data, error, isLoading } = useSWR(searchUrl, speciesNameFetcher, {revalidateOnFocus: false});

    let authority, comName, estab, rank, sciName, status;
    if (data) {
        authority = data.taxonConcept.nameAuthority ??= '';
        estab = data.establishmentMeans ??= '';
        rank = data.taxonConcept.rankString ??= '';
        status = data.taxonConcept.taxonomicStatus ??= '';
        sciName = data.taxonConcept.nameComplete ??= '';
        comName = (data.commonNames && data.commonNames.length > 0 &&
                         data.commonNames[0].nameString) ?
                        data.commonNames[0].nameString : '';
    }
    return (
      <>
        {(isLoading) ? ('Loading...') : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (data) ? (
              <>
                <Typography variant='h4'>{sciName}</Typography>
                <br></br>
                <Typography variant='h5'>{comName}</Typography>
                <br></br>
                <Typography component='div'>
                    <Stack direction='row'>
                        <Box sx={{mr: 3}}>{rank}</Box>
                        <Box sx={{mr: 3}}>{status}</Box>
                        <Box sx={{fontWeight: 'bold'}}>Name authority:</Box>
                        <Box sx={{ml: 1, mr: 3}}>{authority}</Box>
                        <Box sx={{fontWeight: 'bold'}}>Establishment means:</Box>
                        <Box sx={{ml: 1, mr: 3}}>{estab}</Box>
                    </Stack>
                </Typography>
                <br></br>
              </>
            ) : null)
        }
    </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


