import useSWR from 'swr';
import { z } from 'zod';

import { fetcher } from '../../lib/fetcher';

import { ILocation } from '../../lib/types';

// -----------------------------------------------------------------------------
// Define the types of chart data that may be returned.
type TChartData = 'country' | 'dataset' | 'decade' | 'family' | 'genus' | 
                    'licence' | 'month'| 'partner' |'since1990' | 'vc';
// Define the query strings associated with each type of chart data.
const dataTypeQuery: { [k in TChartData]: string } = {
    'country': 'country',
    'dataset': 'data_resource_uid',
    'decade': 'decade',
    'family': 'family',
    'genus': 'genus',
    'licence': 'license',
    'month': 'month',
    'partner': 'data_provider_uid',
    'since1990': 'year&fq=year:[1990%20TO%20*]',
    'vc': 'cl256'
};

// -----------------------------------------------------------------------------
// Define Atlas API calls. 

const baseUrl = 'https://records-ws.nbnatlas.org/chart.json?';

interface IChartData {
    dataType: TChartData; 
    sciName?: string; 
    tvk?: string;
}

// Return the query string segment which relates to the taxon name.
const getTaxonQuery = (sciName?: string, tvk?: string): string => {
    return sciName ? `q=taxon_name:"${sciName}"` : 
            tvk ? `q=lsid:${tvk}` : 'q=*:*';
}

// Return a URL specific to the type of query: location with optional taxon
const getLocationUrl = (loc: ILocation, {dataType, sciName, tvk}: IChartData): string => { 
    const taxon = getTaxonQuery(sciName, tvk);
    const common = '&qc=&xother=false&fq=(geospatial_kosher:true+AND+-occurrence_status:absent)';
    return baseUrl + taxon + common + 
        `&lat=${loc.latitude}&lon=${loc.longitude}&radius=${loc.radius}&x=${dataTypeQuery[dataType]}`; 
}

// Return a URL specific to the type of query: taxon (scientific name or TVK)
const getTaxonUrl = ({dataType, sciName, tvk}: IChartData): string => {
    const taxon = getTaxonQuery(sciName, tvk);
    const common = '&qc=&xmissing=false';
    return baseUrl + taxon + common + `&x=${dataTypeQuery[dataType]}`;
}

const chartFetcher = (url: string) => fetcher(url, ChartSchema);

// -----------------------------------------------------------------------------
// Define data artefacts for Atlas API calls. Example API calls:
// TVK...
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=cl256&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=data_provider_uid&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=data_resource_uid&qc=
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=decade&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=month&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=year&qc=&fq=year:[1990%20TO%20*]
// Location...
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=family&qc=&xother=false&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=genus&qc=&xother=false&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=license&qc=&xother=false&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=month&qc=&xother=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=decade&qc=&xother=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=year&qc=&xother=false&xmissing=false&fq=year:[1990%20TO%20*]
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=cl256&qc=&xother=false
// https://records-ws.nbnatlas.org/chart.json?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=52.9548&lon=1.1581&radius=5.0&x=cl28&qc=&xother=false

const DataSchema = z.object({
    count: z.number().nullish(),
    fq: z.string().nullish(),
    i18nCode: z.string().nullish(),
    label:  z.string().nullish(),
});

const ContainerSchema = z.object({
    data: z.array(DataSchema),
    label: z.string().nullish(),
});

export type TContainerSchema = z.TypeOf<typeof ContainerSchema>;

export const ChartSchema = z.object({
    data: z.array(ContainerSchema),
    x: z.string().nullish(),
    xLabel: z.string().nullish(),
});

type TChartSchema = z.TypeOf<typeof ChartSchema>;

// -----------------------------------------------------------------------------
// Define custom hooks.

export interface IuseChartData {
    data: TChartSchema | undefined;
    error: Error | undefined;
    isLoading: boolean | undefined;
}   
// -------------------

export function useChartDataTaxon(props: IChartData): IuseChartData {
    
    const searchUrl = getTaxonUrl(props);
    const { data, error, isLoading } = 
        useSWR(searchUrl, chartFetcher, { revalidateOnFocus: false });

    const response: IuseChartData = { 
        data: data, 
        error: error, 
        isLoading: isLoading
    };

    return response;
}

// -------------------
// Return a specific type of chart data for a given location, with the option of
// restricting returned data to a specific taxon (scientific name or tvk).

export function useChartDataLoc(loc: ILocation, props: IChartData): IuseChartData {
    
    const searchUrl = getLocationUrl(loc, props);
    const { data, error, isLoading } =
        useSWR(searchUrl, chartFetcher, { revalidateOnFocus: false });

    const response: IuseChartData = { 
        data: data, 
        error: error, 
        isLoading: isLoading
    };

    return response;
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
