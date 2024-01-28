import { useState } from 'react';
import SearchInput from "../form-components/SearchInput";
import OccurrenceList from "../OccurrenceList";


export interface SimpleOccurrenceSearchProps { 
  withImagesOnly? : boolean
}

export const SimpleOccurrenceSearch = ({withImagesOnly = false}) => {

  const [query, setQuery] = useState('');

  const handleSearch = (searchTerm:string) => {
    // Build your query string using the search term
    const imageFilter = withImagesOnly ? "&fq=multimedia:Image":"";
    const occurrenceSearchApiUrl = `https://records-ws.nbnatlas.org/occurrences/search?q=${searchTerm}${imageFilter}`;
    setQuery(occurrenceSearchApiUrl);
  };

  // Render the data resources
  return (<div className="tw-container tw-mx-auto tw-space-y-5"> 
  <SearchInput onSearch={handleSearch}/>

  {query && <OccurrenceList occurrenceSearchApiUrl={query} />}
    </div>
);

};

export default SimpleOccurrenceSearch;
