import React, { useEffect, useMemo, useState } from 'react';

import { Spinner } from '@material-tailwind/react';

import { IExploreMap, ILocation } from '../../shared/lib/types';
import { SpeciesMap } from '../../components';
import { TGroupSchema, TSingleSpeciesSchema, useSpeciesGroup } 
    from '../../shared/hooks/nbn-atlas-api/useSpeciesGroup';
import { TSingleGroupSchema, TGroupsSchema } 
    from '../../shared/hooks/nbn-atlas-api/useSpeciesGroups';

// -----------------------------------------------------------------------------

export interface IExploreSelect extends IExploreMap {
    filterFamilies?: string[];
    filterGroups?: string[];
    group?: TSingleGroupSchema;
    location: ILocation;
    species?: TSingleSpeciesSchema; 
    setGroup?: (group: TSingleGroupSchema) => void;
    setSpecies?: (species: TSingleSpeciesSchema) => void;
}
// -----------------------------------------------------------------------------
// Return a text component formatted according to a group.

function getGroupTypography(group: TSingleGroupSchema): React.JSX.Element {
    
    const fontWeight = (group.level === 0) ? 'font-bold' : 
                    ((group.level === 1) ? 'font-semibold' : 'font-normal');

    const fontStyle = (group.level === 2) ? 'italic' : 'non-italic';
    
    const marginArray = ['', 'ml-[1rem]', 'ml-[2rem]', 'ml-[3rem]', 'ml-[4rem]'];
    const margin = (group.level < marginArray.length) ? marginArray[group.level] : '';  

    return (
        <span className={`${fontWeight} ${fontStyle} ${margin}`}>
            {group.name}        
        </span>
    );
}
// -----------------------------------------------------------------------------

export function ExploreMap(props: IExploreMap): React.JSX.Element {

    return (
        <div className='px-4'>
            <SpeciesMap search={props} 
                        h={'500'} 
                        w={'500'}
                        interactive={'1'} 
                        logo={'2'} 
                        unconfirmed={'1'}
                        map_id={'exploremap-map'} />
        </div>        
    );
}
// -----------------------------------------------------------------------------

interface IGroupsTable {
    groups: TGroupsSchema;
    setGroup?: (group: TSingleGroupSchema) => void;
}
// ----------------

export function GroupsTable({groups, setGroup}: IGroupsTable): React.JSX.Element {
    
    const [selectedRow, setSelectedRow] = useState<number>(0);

    const handleRowClick = (id: number): void => { 
        setSelectedRow(id); 
        if (setGroup && id >= 0) {
            setGroup(groups[id]);
        }
    }; 

    useEffect(() => {
        // Set default row selection on first render.
        handleRowClick(0);
    }, []);

    return (
        <div className='w-full pb-4'>
        <table className='border mx-2 text-sm'>
        <thead className='border-b-4'>
          <tr className='bg-blue-50'>
            <th className='text-left px-4'>Group</th>
            <th className='text-left px-4'>Species Count</th>
          </tr>
        </thead>
        <tbody className=''>
          {groups.map((group, index) => (
            <tr key={index} 
                className={`border-b cursor-pointer 
                    ${index === selectedRow ? 'bg-gray-300' : 'hover:bg-gray-100'}`} 
                onClick={() => handleRowClick(index)} >
              <td className='px-4' >
                {getGroupTypography(group)}                 
              </td>
              <td className='text-right px-4'>{group.speciesCount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>        
      </table>
      </div>
    );
}
// -----------------------------------------------------------------------------

interface IGroupTable {
    exploreSelect: IExploreSelect;
    group: TSingleGroupSchema | null;
    setSpecies?: (species: TSingleSpeciesSchema) => void;
}
// ----------------

export function GroupTable(props: IGroupTable): React.JSX.Element {
    
    const{ exploreSelect, group, setSpecies } = props;
    const loc = exploreSelect.location;

    const [selectedRow, setSelectedRow] = useState<number>(-1);

    const { data, error, isLoading } = useSpeciesGroup(group?.name ?? '', 
                loc.latitude, loc.longitude, loc.radius, 
                exploreSelect.filterFamilies);
    const filteredGroup = useMemo(() => transformGroup(data, 
                exploreSelect.filterFamilies), 
                [exploreSelect.filterFamilies, data]);

    useEffect(() => {
        // Clear row selection on group change.
        setSelectedRow(-1);
    }, [group]);

    const handleRowClick = (id: number): void => { 
        setSelectedRow(id); 
        if (setSpecies && data && id >= 0) {
            setSpecies(data[id]);
        }
    }; 

    return (
        <>
        {(isLoading) ? (<Spinner />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (filteredGroup) ? (
            <div className='w-full pb-4'>
            <table className='border mx-2 text-sm'>
                <thead className='border-b-4'>
                <tr className='bg-blue-50'>
                    <th className='text-left px-2'></th>
                    <th className='text-left px-2'>Common Name</th>
                    <th className='text-left px-2'>Species</th>
                    <th className='text-right px-2'>Record Count</th>
                </tr>
                </thead>
                <tbody className=''>
                {filteredGroup.map((species, index) => (
                    <tr key={index}                 
                        className={`border-b cursor-pointer 
                            ${index === selectedRow ? 'bg-gray-300' : 'hover:bg-gray-100'}`} 
                        onClick={() => handleRowClick(index)} >
                        <td className='text-center px-2'>
                            {index+1}
                        </td>
                        <td className='px-2'>
                            {species.commonName.length > 0 ? species.commonName : '[Not supplied]'}
                        </td>
                        <td className='px-2'>
                            {species.name}
                        </td>
                        <td className='text-right px-4'>
                            {species.count.toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>        
            </table>            
            </div>
            ) : null)
        } 
        </>
    );
}
// -----------------------------------------------------------------------------
// Filter the members of a 'TGroupSchema' to return only those where 'family' 
// matches a member of a provided 'filterFamilies' array.

function transformGroup(group?: TGroupSchema, filterFamilies?: string[]): TGroupSchema|undefined {
    
    const filtered = (filterFamilies && filterFamilies.length > 0) ? 
            group?.filter((species) => 
                filterFamilies.some(family => 
                    family.toLowerCase() === species.family.toLowerCase())) :
            group;

    return filtered;
}
// -----------------------------------------------------------------------------
// Filter the members of a 'TGroupsSchema' to return only those where 'name' 
// matches a member of a provided 'filterGroups' array.

export function transformGroups(groups?: TGroupsSchema, filterGroups?: string[]): TGroupsSchema|undefined {
    
    const filtered = (filterGroups && filterGroups.length > 0) ? 
            groups?.filter((group) => 
                filterGroups.some(name => 
                        name.toLowerCase() === group.name.toLowerCase())) :
            groups;

    return filtered;
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
