import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import { SimpleSpeciesSearch, simpleSpeciesSearchFetcher, buildSearchUrl } from '../../shared/hooks/nbn-atlas-api/useSimpleSpeciesSearch' 


interface SpeciesSearchAndSelectProps {
    onChange?: (species: {displayName:string, guid:string}|null) => void;
  }

const SpeciesSearchAndSelect = ({ onChange}: SpeciesSearchAndSelectProps )=>{ 

    const handleChange = (        
        newValue: SingleValue<{ label: string; value: SimpleSpeciesSearch }>    ) => {

            if (!onChange) return;

            if (!newValue){
                onChange(null)
            }
             else{
                onChange({displayName:newValue.label, guid:newValue.value.guid});              
            }
            
    };

  
    return (
        <AsyncSelect
            cacheOptions
            placeholder={"Search for species..."}
            loadOptions={fetchSimpleSpeciesSearchResult}
            onChange={handleChange}
           

        />
    );
};

export default SpeciesSearchAndSelect;


const fetchSimpleSpeciesSearchResult = async (inputValue: string): Promise<Array<{ label: string; value: SimpleSpeciesSearch }>> => {
    if (!inputValue) {
        return [];
    }

    try {
        const data = await simpleSpeciesSearchFetcher(buildSearchUrl(inputValue));

        return data.searchResults.results.map(species => ({
            label: species.commonName+" ("+species.scientificName+")",
            value: species
        }));
    } catch (error) {
        console.error('Error in fetchSimpleSpeciesSearchResult:', error);
        return [];
    }
};
