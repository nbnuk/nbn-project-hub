import { useMemo, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import useSWR from 'swr';
import { z } from 'zod';
import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------
// Define data artefacts associated with API call. Example:
// https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&limit=50&q=red
  
const DataItemSchema = z.object({
  guid: z.string(),
  commonName: z.string().nullish(),
  name: z.string(),
  rankString: z.string()
});

type TDataItemSchema = z.TypeOf<typeof DataItemSchema>;

const DataObjectSchema = z.object({
  autoCompleteList: z.array(DataItemSchema)
})

// -----------------------------------------------------------------------------

const searchUrl = 'https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&limit=50&q=';

const dataListFetcher = (url:string) => fetcher(url, DataObjectSchema);

// -----------------------------------------------------------------------------


export interface ISpecies {
  commonName: string | null;
  rank: string;
  scientificName: string;
  tvk: string;
}
// -----------------------------------------------------------------------------
// Transform data returned from API call to format suitable for display by
// SpeciesAutoComplete component.

interface IAssocArray {
  [key: string]: ISpecies;
}

function transformData(items: TDataItemSchema[]|undefined): IAssocArray {

    const data: IAssocArray = {};
    if (!items) {
        return data;
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.rankString.toLowerCase() === 'species') {
            const species: ISpecies = {
                tvk: item.guid,
                scientificName: item.name,
                commonName: item.commonName || '',
                rank: item.rankString,
            }            
            const str: string = `${item.name} (${item.guid})`;
            if (!(str in data)) {
                data[str] = species;
            }
            if (item.commonName) {
                const str: string = `${item.commonName} (${item.guid})`;
                if (!(str in data)) {
                    data[str] = species;
                }
            }
        }
    }
    return data;
}
// -----------------------------------------------------------------------------

interface ISpeciesAutoComplete {
    /** Optional seed for search term to pre-populate search box. */
    initialSearchQuery?: string;
    /** Optional callback function which will be called when a list item is
     * clicked. */
    setSpecies?: (species: ISpecies) => void;
  }
// ---------------------------
  
export function SpeciesAutoComplete({ initialSearchQuery, setSpecies }: ISpeciesAutoComplete): JSX.Element {
  
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
 
    // Ensure that the minimum length criterion is met before searching.
    const minLenOk: boolean = searchQuery.length > 1;
    const { data, error, isLoading } = 
        useSWR(minLenOk ? searchUrl+searchQuery : null, dataListFetcher, 
                { revalidateOnFocus: false });
 
    const dedup = useMemo(() => transformData(data?.autoCompleteList), [data?.autoCompleteList]);

    const handleChange = (_event: React.SyntheticEvent, newValue: string|null) => {
        // Send selected species to parent component.
        if (setSpecies && newValue) {
            const species: ISpecies = dedup[newValue];
            setSpecies(species);
        }
    }

    const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
        setSearchQuery(newInputValue);
    }

    return (
        <div>
        {(error) ? (`Error fetching data: ${error.message}`) : 
        (
            <Autocomplete
            id='speciesautocomplete'
            freeSolo
            options={Object.keys(dedup)}
            loading={isLoading}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderInput={(params) => (
                <TextField {...params} 
                    label='Search for species' 
                    variant='outlined' 
                    />
            )}
            />
        )}
        </div>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


