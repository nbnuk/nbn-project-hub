import useSWR from 'swr';
import { z } from 'zod';

import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------

const BASE_URL = 'https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&limit=50&q=';



// -----------------------------------------------------------------------------
// Define data artefacts associated with API call. Example:
// https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&limit=50&q=red
  
export const SpeciesOptionSchema = z.object({
    guid: z.string(),
    commonName: z.string().nullish(),
    name: z.string(),
    rankString: z.string()
});
  
export type SpeciesOption = z.TypeOf<typeof SpeciesOptionSchema>;
  
export const SpeciesOptionListSchema = z.object({
    autoCompleteList: z.array(SpeciesOptionSchema)
});

export type SpeciesOptionList = z.TypeOf<typeof SpeciesOptionListSchema>;

const autoCompleteFetcher = (url:string) => fetcher(url, SpeciesOptionListSchema);

export function useSpeciesAutoComplete(searchQuery: string):  { data: SpeciesOptionList | undefined, error: any, isLoading: boolean } {
    
    const searchUrl = BASE_URL + searchQuery;
    
    const { data, error, isLoading } =  useSWR( searchUrl, autoCompleteFetcher, { revalidateOnFocus: false });

   return { 
        data: data, 
        error: error, 
        isLoading: isLoading
    };

   
}

