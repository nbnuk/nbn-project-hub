import { SingleValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { SpeciesAutoCompleteOptionListSchema, SpeciesAutoCompleteOption, removeDuplicates, SPECIES_AUTOCOMPLETE_BASE_URL } from '../../shared/hooks/nbn-atlas-api/useSpeciesAutoComplete' 
import { fetcher } from '../../shared/lib/fetcher';

interface SpeciesInputWithAutoCompleteProps {
    onChange?: (species: {name:string, guid:string|null}|null) => void;
  }

const SpeciesInputWithAutoComplete = ({ onChange}: SpeciesInputWithAutoCompleteProps )=>{ 

    const handleChange = (        
        newValue: SingleValue<{ label: string; value: SpeciesAutoCompleteOption|string }>    ) => {

            if (!onChange) return;

            if (!newValue){
                onChange(null)
            }
            else if (typeof newValue?.value === 'string') {
                onChange({name:newValue.value, guid:null})
            }
            else{
                onChange({name:newValue.label, guid:newValue.value.guid});              
            }
            
    };

    const formatCreateLabel = (inputValue:string) => `Search for... ${inputValue}`;

    return (
        <AsyncCreatableSelect
            cacheOptions
            placeholder={"Search for species..."}
            loadOptions={fetchSpeciesAutoCompleteOptions}
            onChange={handleChange}
            createOptionPosition="first"
            formatCreateLabel={formatCreateLabel}

        />
    );
};

export default SpeciesInputWithAutoComplete;


const fetchSpeciesAutoCompleteOptions = async (inputValue: string): Promise<Array<{ label: string; value: SpeciesAutoCompleteOption }>> => {
    if (!inputValue) {
        return [];
    }

    try {
        const data = await fetcher(`${SPECIES_AUTOCOMPLETE_BASE_URL}${inputValue}`, SpeciesAutoCompleteOptionListSchema);

        data.autoCompleteList = removeDuplicates(data.autoCompleteList);

        return data.autoCompleteList.map(species => ({
            label: (species.commonNameMatches?.length && species.commonName)? species.commonName : species.name,
            value: species
        }));
    } catch (error) {
        console.error('Error fetching species options:', error);
        return [];
    }
};
