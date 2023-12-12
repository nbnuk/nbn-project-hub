import useSWR from 'swr';
import { z } from 'zod';

import { fetcher } from '../../lib/fetcher';

// -----------------------------------------------------------------------------
// Define Atlas API calls. Six calls, one per chart.

const baseUrl = 'https://records-ws.nbnatlas.org/chart.json?';

const viceCountyUrl = baseUrl + 'x=cl256&qc=&xmissing=false&q=lsid:';
const partnerUrl = baseUrl + 'x=data_provider_uid&qc=&xmissing=false&q=lsid:';
const datasetUrl = baseUrl + 'x=data_resource_uid&qc=&q=lsid:';
const decadeUrl = baseUrl + 'x=decade&qc=&xmissing=false&q=lsid:';
const monthUrl = baseUrl + 'x=month&qc=&xmissing=false&q=lsid:';
const sinceUrl = baseUrl + 'x=year&qc=&fq=year:[1990%20TO%20*]&q=lsid:';

export const getViceCountyUrl = (tvk: string): string => { return viceCountyUrl + tvk; }
export const getPartnerUrl = (tvk: string): string => { return partnerUrl + tvk; }
export const getDatasetUrl = (tvk: string): string => { return datasetUrl + tvk; }
export const getDecadeUrl = (tvk: string): string => { return decadeUrl + tvk; }
export const getMonthUrl = (tvk: string): string => { return monthUrl + tvk; }
export const getSinceUrl = (tvk: string): string => { return sinceUrl + tvk; }

const chartFetcher = (url: string) => fetcher(url, ChartSchema);

// -----------------------------------------------------------------------------
// Define data artefacts for Atlas API calls. Example API calls:
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=cl256&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=data_provider_uid&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=data_resource_uid&qc=
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=decade&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=month&qc=&xmissing=false
// https://records-ws.nbnatlas.org/chart.json?q=lsid:NHMSYS0000080188&x=year&qc=&fq=year:[1990%20TO%20*]

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
// Define custom hook.

interface IuseChartData {
    data: TChartSchema | undefined;
    error: Error | undefined;
    isLoading: boolean | undefined;
}   
// -------------------

export function useChartData(searchUrl: string): IuseChartData {
    
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


