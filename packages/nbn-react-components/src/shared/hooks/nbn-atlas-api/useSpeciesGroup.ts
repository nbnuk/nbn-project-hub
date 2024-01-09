import useSWR from 'swr';
import { z } from 'zod';

import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------

const baseUrl = 'https://records-ws.nbnatlas.org/explore/group/';

function getGroupUrl(groupName: string, lat: number, lon: number, radius: number,
            families?: string[]): string {
    const pageUrl = `${baseUrl}${groupName}.json?`;
    const baseQry = 'fq=(geospatial_kosher:true+AND+-occurrence_status:absent)&sort=count&pageSize=25';
    const familyQry = families ? '&fq=family:' + families.join('+OR+') : '';
    const qry = `${baseQry}&lat=${lat}&lon=${lon}&radius=${radius}` + familyQry;
    return pageUrl + qry;
}

const groupFetcher = (url: string) => fetcher(url, GroupSchema);

// -----------------------------------------------------------------------------
// Define data artefacts for species API call. Example API call:
// https://records-ws.nbnatlas.org/explore/group/Fungi.json?fq=(geospatial_kosher:true+AND+-occurrence_status:absent)&sort=count&pageSize=50&lat=53.2149&lon=-2.911&radius=5

const SingleSpeciesSchema = z.object({
    commonName: z.string(),
    count: z.number(),
    family: z.string(),
    guid: z.string(),
    kingdom: z.string(),
    name: z.string(),
    rank: z.string()
});

export type TSingleSpeciesSchema = z.TypeOf<typeof SingleSpeciesSchema>;

const GroupSchema = z.array(SingleSpeciesSchema);

export type TGroupSchema = z.TypeOf<typeof GroupSchema>;

// -----------------------------------------------------------------------------
// Define custom hook.

interface IuseSpeciesGroup {
    data: TGroupSchema | undefined;
    error: Error | undefined;
    isLoading: boolean | undefined;
}   
// -------------------

export function useSpeciesGroup(groupName: string, lat: number, lon: number, 
                    radius: number, families?: string[]): IuseSpeciesGroup {
    
    const searchUrl: string = getGroupUrl(groupName, lat, lon, radius, families);
    const { data, error, isLoading } = 
        useSWR(searchUrl, groupFetcher, {revalidateOnFocus: false});

    const response: IuseSpeciesGroup = { 
        data: data, 
        error: error, 
        isLoading: isLoading 
    };

    return response;
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
