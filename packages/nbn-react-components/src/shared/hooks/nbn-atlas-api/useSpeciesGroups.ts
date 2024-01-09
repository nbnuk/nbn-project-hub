import useSWR from 'swr';
import { z } from 'zod';

import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------

const baseUrl = 'https://records-ws.nbnatlas.org/explore/groups.json?fq=(geospatial_kosher:true+AND+-occurrence_status:absent)';

const getGroupsUrl = (lat: number, lon: number, radius: number): string => 
    { return `${baseUrl}&lat=${lat}&lon=${lon}&radius=${radius}`; }

const groupsFetcher = (url: string) => fetcher(url, GroupsSchema);

// -----------------------------------------------------------------------------
// Define data artefacts for groups API call. Example API call:
// https://records-ws.nbnatlas.org/explore/groups.json?fq=(geospatial_kosher:true+AND+-occurrence_status:absent)&lat=53.2149&lon=-2.9110&radius=5

const SingleGroupSchema = z.object({
    count: z.number(),
    level: z.number(),
    name: z.string(),
    speciesCount: z.number(),
});

export type TSingleGroupSchema = z.TypeOf<typeof SingleGroupSchema>;

const GroupsSchema = z.array(SingleGroupSchema);

export type TGroupsSchema = z.TypeOf<typeof GroupsSchema>;

// -----------------------------------------------------------------------------
// Define custom hook.

interface IuseSpeciesGroups {
    data: TGroupsSchema | undefined;
    error: Error | undefined;
    isLoading: boolean | undefined;
}   
// -------------------

export function useSpeciesGroups(lat: number, lon: number, radius: number): IuseSpeciesGroups {
    
    const searchUrl: string = getGroupsUrl(lat, lon, radius);
    const { data, error, isLoading } = 
        useSWR(searchUrl, groupsFetcher, {revalidateOnFocus: false});

    const response: IuseSpeciesGroups = { 
        data: data, 
        error: error, 
        isLoading: isLoading 
    };

    return response;
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
