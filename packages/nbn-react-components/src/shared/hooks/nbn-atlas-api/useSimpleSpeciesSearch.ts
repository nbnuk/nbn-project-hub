import useSWR from 'swr';
import { z } from "zod";
import { fetcher } from '../../lib/fetcher';

export const SimpleSpeciesSearchSchema = z.object({
  guid: z.string(),
  scientificName: z.string().optional(),  
  commonName: z.string().optional(),
  commonNameSingle: z.string().optional(),
  rank: z.string().optional(),
});

export const SimpleSpeciesSearchResultSchema = z.object({
  searchResults: z.object({
     totalRecords: z.number(),
     results: z.array(SimpleSpeciesSearchSchema),
  })
});

export type SimpleSpeciesSearch = z.TypeOf<typeof SimpleSpeciesSearchSchema>;
export type SimpleSpeciesSearchResult = z.TypeOf<typeof SimpleSpeciesSearchResultSchema>;

export const simpleSpeciesSearchFetcher = (url: string) => fetcher(url, SimpleSpeciesSearchResultSchema);

export const buildSearchUrl = (speciesSearchTerm:string) => ("https://species-ws.nbnatlas.org/search?fq=idxtype:TAXON&q="+encodeURIComponent(speciesSearchTerm))

// Define the hook
export const useSimpleSpeciesSearch = (speciesSearchTerm: string):  { simpleSpeciesSearchResult: SimpleSpeciesSearchResult | undefined, error: any, isValidating: boolean } => {
 
  const { data, error, isValidating } = useSWR(buildSearchUrl(speciesSearchTerm), simpleSpeciesSearchFetcher, { revalidateOnFocus: false });

 

  return { simpleSpeciesSearchResult:data, error, isValidating };
};
