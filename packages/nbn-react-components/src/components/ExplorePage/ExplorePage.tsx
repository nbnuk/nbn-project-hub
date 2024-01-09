import React, { useState } from 'react';

import { ExploreLocate, ExploreTab } from '../../components';

import { TSingleSpeciesSchema } 
    from '../../shared/hooks/nbn-atlas-api/useSpeciesGroup';
import { TSingleGroupSchema } 
    from '../../shared/hooks/nbn-atlas-api/useSpeciesGroups';
import { ILocation } from '../../shared/lib/types';

// Example:
// https://records.nbnatlas.org/explore/your-area#53.2143|-2.9299|12|ALL_SPECIES

// -----------------------------------------------------------------------------

interface IExplorePage {

    filterFamilies? : string[];
    filterGroups? : string[];
    region?: string;
}
// -----------------------------------------------------------------------------

export default function ExplorePage( props: IExplorePage): React.JSX.Element {

    const { filterFamilies, filterGroups, region } = props;
    
    const [group, _setGroup] = useState<TSingleGroupSchema|undefined>(undefined);
    const [species, _setSpecies] = useState<TSingleSpeciesSchema|undefined>(undefined);
    const [location, setLocation] = useState<ILocation|undefined>(undefined);
    const [isGroup, setIsGroup] = useState<boolean>(true);
    const [name, setName] = useState<string>('');

    const setGroup = (group: TSingleGroupSchema) => {
        _setGroup(group);
        setIsGroup(true);
        setName(group.name);
    }

    const setSpecies = (species: TSingleSpeciesSchema) => {
        _setSpecies(species);
        setIsGroup(false);
        setName(species.name);
    }

    return (
        <div className='m-4'>
        <ExploreLocate region={region || 'uk'} setLocation={setLocation} />
        {location && (
            <ExploreTab isGroup={isGroup} 
                    name={name} 
                    location={location} 
                    filterFamilies={filterFamilies}
                    filterGroups={filterGroups}
                    group={group}
                    species={species}
                    setGroup={setGroup} 
                    setSpecies={setSpecies} />
            
        )
        }
        </div>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
