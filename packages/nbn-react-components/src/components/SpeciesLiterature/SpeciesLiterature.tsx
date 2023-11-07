import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';

import { getSpeciesNameUrl, speciesNameFetcher } from '../../lib/nameutils';
import { BhlCard, celBaseUrl, CelCard, CelSchema, TitleCard } from './literature';

// Example page:
// https://species.nbnatlas.org/species/NHMSYS0000504624#literature

// -----------------------------------------------------------------------------
// Required as a workaround for CORS protection on conservationevidence.com.
const corsProxyUrl = 'https://corsproxy.io/?';

const getCelSearchUrl = (sciName: string): string => 
  { return corsProxyUrl + celBaseUrl + 
            `binomial/nbnsearch?name=${sciName}&action=1&total=8`; }

const celFetcher = (url: string) => fetcher(url, CelSchema);

// -----------------------------------------------------------------------------

interface ISpeciesLiterature {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesLiterature({ tvk }: ISpeciesLiterature): JSX.Element {

    // Get search terms for BHL site. Consists of an array of the scientific 
    // name plus any synonyms
    const namesSearchUrl: string = getSpeciesNameUrl(tvk);
    const names = useSWR(namesSearchUrl, speciesNameFetcher, {revalidateOnFocus: false});
    const sciNames: string[] = [names.data?.classification.scientificName || ''];
    names.data?.synonyms.forEach((syn) => sciNames.push(syn.nameString ??= ''))
    // Get the CEL references.
    const celSearchUrl: string = getCelSearchUrl(sciNames[0]);
    const cel = useSWR(celSearchUrl, celFetcher, {revalidateOnFocus: false});
    
    return (
      <>
        {(names.isLoading || cel.isLoading) ? (<CircularProgress />) : 
          ((names.error || cel.error) ? ('Error fetching data') : 
            (names.data && cel.data) ? (
              <Grid container spacing={2}>
                  <TitleCard text='Biodiversity Heritage Library'></TitleCard>
                  <BhlCard sciNames={sciNames}></BhlCard>
                  <TitleCard text='Conservation Evidence Library'></TitleCard>
                  <CelCard sciName= {sciNames[0]} data={cel.data}></CelCard>
                </Grid>
            ) : null)
          }
      </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


