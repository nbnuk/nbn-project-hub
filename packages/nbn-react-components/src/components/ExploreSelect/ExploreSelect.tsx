import React, { useMemo } from 'react';

import { Spinner } from '@material-tailwind/react';

import { useSpeciesGroups } 
    from '../../shared/hooks/nbn-atlas-api/useSpeciesGroups';

import { ExploreMap, IExploreSelect, GroupsTable, GroupTable, transformGroups } 
    from './select';

// -----------------------------------------------------------------------------

export default function ExploreSelect(props: IExploreSelect): React.JSX.Element {
  const { filterFamilies, filterGroups, location, group, setGroup, setSpecies } = props;

  const { data, error, isLoading } = useSpeciesGroups(location.latitude, 
                    location.longitude, location.radius);
  const filteredGroups = useMemo(() => transformGroups(data, filterGroups), 
                    [filterGroups, data]);

  const showTable = (filterGroups && filterGroups.length > 0) || 
                    !filterFamilies || filterFamilies.length === 0;

  return (
      <>
      {(isLoading) ? (<Spinner />) : 
        ((error) ? (`Error fetching data: ${error.message}`) : 
          (filteredGroups) ? (
            <div className='flex flex-col lg:flex-row'>
              {(showTable) &&
              <GroupsTable groups={filteredGroups} setGroup={setGroup} />}
              <GroupTable group={group || filteredGroups[0]} 
                  exploreSelect={props} 
                  setSpecies={setSpecies} />
              {(props.isGroup != null) && (<ExploreMap {...props} />)}
            </div>
          ) : null)
      } 
      </>
  );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


