import { KeyboardEvent, useEffect, useState } from 'react';

import { Button, Checkbox, Input, Tooltip } from '@material-tailwind/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import { ICoord, useSearchLocation } from '../../shared/hooks/useSearchLocation';

// -----------------------------------------------------------------------------

interface ISearchLocationProps {
    defaultRegion?: string;
    setCoord: (coord: ICoord) => void;
}

export function SearchLocation(props: ISearchLocationProps): React.JSX.Element {

    const { defaultRegion, setCoord } = props;

    // State variables. Search parameters entered by the user.
    const [inputValue, setInputValue] = useState<string>(defaultRegion || '');
    const [searchQuery, setSearchQuery] = useState<string>(defaultRegion || '');
    const [isChecked, setIsChecked] = useState(false);
    
    // Event handlers.
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setInputValue('');
        } else if (event.key === 'Enter') {
            handleSearchButtonClick();
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setSearchQuery(isChecked ? 'current' : inputValue);
    };

    // Hooks.
    const location = useSearchLocation(searchQuery);
    
    useEffect(() => {   
        if (location.error) {
            alert(location.error.message);
            setSearchQuery(defaultRegion || 'uk');
        }
        else if (location.coord) {
            setCoord(location.coord)
        }

    }, [location])

    return (
        <>
        <div className='flex relative items-center max-w-[36rem]'>
            <Input 
                className='h-10'
                type='text'
                color='blue'
                label='Search for location'
                value={inputValue}
                disabled={isChecked}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                crossOrigin=''
            />
            <Button
                className='h-10 normal-case'
                color='blue'
                onClick={handleSearchButtonClick}
                placeholder=''>
                Search
            </Button>
        </div>
        <div className='flex items-center'>
            <Checkbox
                label='Use current location'
                checked={isChecked}
                onChange={handleCheckboxChange}
                crossOrigin=''
                />
            
            <SearchTooltip />
        </div>
        </>
    );
}
// -----------------------------------------------------------------------------

interface ISearchRadiusProps {
    setRadius: (radius: number) => void;
}

export function SearchRadius({ setRadius }: ISearchRadiusProps): React.JSX.Element {

    const [selected, setSelected] = useState('5');
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
        setRadius(parseFloat(event.target.value));
    };

    return (
        <div className='flex items-center'>
            Display records in a&nbsp;
            <div className='w-12'>
                <select value={selected}
                    className='h-8 border rounded-lg focus:border-blue-500'
                        onChange={handleSelectChange} >
                    <option>0.1</option>
                    <option>0.5</option>
                    <option>1</option>
                    <option>5</option>
                    <option>10</option>
                </select>
            </div>
            &nbsp;km radius
        </div>
    );
}
// -----------------------------------------------------------------------------

function SearchTooltip(): React.JSX.Element {
    return (
        <Tooltip
          content={
            <div className='w-80'>
            <div className='text-white text-large font-medium'>
                Search for a Location
            </div>
            <div className='text-white text-small font-normal opacity-80'>
                <p>Enter a location such as a postcode, OS grid reference, 
                Watsonian Vice County, or country. <i>Note that all locations 
                must be within the UK.</i></p>
                <hr />
                <p>Alternatively, select the <b>'Use current location' </b> 
                checkbox to use your current location.</p>
                <hr />
                <p>Press the <b>'Search'</b> button to find the location.</p>
            </div>
          </div>
          }
        >
        <QuestionMarkCircleIcon className='h-6 w-6 mx-1 stroke-blue-500' />
        </Tooltip>
      );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

