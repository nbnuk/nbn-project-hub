import CircularProgress from '@mui/material/CircularProgress';

import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';

import { getSpeciesNameUrl, speciesNameFetcher } from '../../lib/nameutils';
import { GenBankSchema, GenbankCards, GenbankTitle } from './sequences';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#sequences

// -----------------------------------------------------------------------------

const baseUrl = 'https://species.nbnatlas.org/externalSite/genbank?s=';

const getGenBankUrl = (sciName: string): string => { return baseUrl + sciName; }

const genBankFetcher = (url: string) => fetcher(url, GenBankSchema);

// -----------------------------------------------------------------------------

interface ISpeciesSequences {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesSequences({ tvk }: ISpeciesSequences): JSX.Element {

    // Get scientific name
    const namesSearchUrl: string = getSpeciesNameUrl(tvk);
    const names = useSWR(namesSearchUrl, speciesNameFetcher, {revalidateOnFocus: false});
    const sciName: string = names.data?.classification.scientificName || '';
    // Get Genbank data
    const genBankUrl: string = getGenBankUrl(sciName);
    const gen = useSWR(genBankUrl, genBankFetcher, {revalidateOnFocus: false});

    return (
        <>
        {(names.isLoading || gen.isLoading) ? (<CircularProgress />) : 
          ((names.error || gen.error) ? ('Error fetching data') : 
            (names.data && gen.data) ? (
                <>
                <GenbankTitle genBank={gen.data}></GenbankTitle>
                <GenbankCards genBank={gen.data}></GenbankCards>
                </>
            ) : null)
          }
        </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


