import { useState } from 'react';
import useSWR from 'swr';
import { z } from 'zod';
import { fetcher } from '../../lib/fetcher';
import './sac.css';

// -----------------------------------------------------------------------------

const searchUrl = 'https://species-ws.nbnatlas.org/search/auto?idxType=TAXON&all=true&q=';
  
const DataItemSchema = z.object({
  guid: z.string(),
  commonName: z.nullable(z.string()),
  name: z.string(),
  rankString: z.string()
});

const DataObjectSchema = z.object({
  autoCompleteList: z.array(DataItemSchema)
})

const dataListFetcher = (url:string) => fetcher(url, DataObjectSchema);

// -----------------------------------------------------------------------------

interface ISpeciesAutoComplete {
  /** Optional seed for search term to pre-populate search box. */
  initialSearchQuery?: string;
  /** Optional callback function which will be called when a list item is
   * clicked. */
  setSpecies?: (species: ISpecies) => void;
}

export interface ISpecies {
  tvk: string;
  scientificName: string;
  commonName: string | null;
  rank: string;
}

// -----------------------------------------------------------------------------

export function SpeciesAutoCompleteOrig({ initialSearchQuery, setSpecies }: ISpeciesAutoComplete): JSX.Element {
  
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  const handleListClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (setSpecies) {
      const species: ISpecies = {
        tvk: e?.currentTarget?.id,
        scientificName: e?.currentTarget?.dataset.scientificname || '',
        commonName: e?.currentTarget?.dataset.commonname || '',
        rank: e?.currentTarget?.dataset.rank || '',
      }
      setSpecies(species);
    }
  }
  const { data, error, isValidating } = useSWR(searchUrl+searchQuery, 
              dataListFetcher, { revalidateOnFocus: false });
 
  // Deduplicate results from API call.
  const dedup = data?.autoCompleteList.filter((obj, index) => {
    return index === data?.autoCompleteList.findIndex(o => obj.guid === o.guid);
  });
  // Ensure that minimum length criterion is met.
  const minLenOk: boolean = searchQuery.length > 1;
  return (
    <div className='sac_div'>
      <input
        type='text'
        placeholder='Search for species'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul className='sac_ul'>
        {(minLenOk) ? (dedup?.map((item) => (
          <li key={item.guid} 
            id={item.guid} 
            data-scientificname={item.name}
            data-commonname={item.commonName}
            data-rank={item.rankString}
            onClick={handleListClick}>
            <span className='sac_sciname'>{item.name}</span>
            <br />
            <span className='sac_comname'>{item.commonName}</span>
            <br />
            <span className='sac_guid'>{item.guid}</span>
            <br />
            <span className='sac_rank'>{item.rankString}</span>
          </li>
          ))) : ('')}
      </ul>
      {error && <div>Error fetching data: {error.message}</div>}
      {isValidating && <div>Loading...</div>}
    </div>
  );
  
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


