import { SingleValue } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { SpeciesAutoCompleteOption, removeDuplicates, speciesAutoCompleteFetcher, buildUrl } from '../../shared/hooks/nbn-atlas-api/useSpeciesAutoComplete' 

interface SpeciesAutoCompleteProps {
    onChange?: (species: {name:string, guid:string|null}|null) => void;
  }

const SpeciesAutoComplete = ({ onChange}: SpeciesAutoCompleteProps )=>{ 

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

    const formatCreateLabel = (inputValue:string) => `${inputValue}`;

    return (
        <AsyncCreatableSelect
            styles={{
                container: (baseStyles, state) => ({
                    ...baseStyles,                  
                    width:'500px'
                  }),
                 input: (baseStyles, state) => ({
                    ...baseStyles,
                    outlineStyle: 'none',
                    paddingTop:'10px',
                    paddingBottom:'10px',
                    outline: 'none',
                  }),
            }}
            cacheOptions
            placeholder={"Enter species..."}
            loadOptions={fetchSpeciesAutoCompleteOptions}
            onChange={handleChange}
            // createOptionPosition="first"
            formatCreateLabel={formatCreateLabel}

        />
    );
};

export default SpeciesAutoComplete;


const fetchSpeciesAutoCompleteOptions = async (inputValue: string): Promise<Array<{ label: string; value: SpeciesAutoCompleteOption }>> => {
    if (!inputValue) {
        return [];
    }
    
    try {
        const data = await speciesAutoCompleteFetcher(buildUrl(inputValue));

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
