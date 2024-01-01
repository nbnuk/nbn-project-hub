import useSWR from 'swr';
import { z } from 'zod';


import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// Define data artefacts associated with API call. Example:
// https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&q=red
  
export const SpeciesAutoCompleteOptionSchema = z.object({
    guid: z.string(),
    commonName: z.string().nullish(),
    name: z.string(),
    rankString: z.string(),
    commonNameMatches: z.array(z.string())
});
  
export type SpeciesAutoCompleteOption = z.TypeOf<typeof SpeciesAutoCompleteOptionSchema>;
  
export const SpeciesAutoCompleteOptionListSchema = z.object({
    autoCompleteList: z.array(SpeciesAutoCompleteOptionSchema)
});

export type SpeciesAutoCompleteOptionList = z.TypeOf<typeof SpeciesAutoCompleteOptionListSchema>;

export const speciesAutoCompleteFetcher = (url:string) => fetcher(url, SpeciesAutoCompleteOptionListSchema);

export const removeDuplicates = (data: SpeciesAutoCompleteOption[]): SpeciesAutoCompleteOption[] => {
    const guids = new Set<string>();
    return data.filter(item => {
        if (guids.has(item.guid)) {
            return false;
        }
        guids.add(item.guid);
        return true;
    });
};

export const buildUrl = (speciesSearchTerm:string) => (`https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&limit=20&q=${encodeURIComponent(speciesSearchTerm)}`)


export function useSpeciesAutoComplete(searchTerm: string):  { data: SpeciesAutoCompleteOptionList | undefined, error: any, isLoading: boolean } {
    
     
    const { data, error, isLoading } =  useSWR( buildUrl(searchTerm), speciesAutoCompleteFetcher, { revalidateOnFocus: false });
    
    if (data){
        data.autoCompleteList = removeDuplicates(data.autoCompleteList)
    }

   return { 
        data: data, 
        error: error, 
        isLoading: isLoading
    };

   
}

