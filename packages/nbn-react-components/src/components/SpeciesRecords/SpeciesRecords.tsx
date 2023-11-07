import CircularProgress from '@mui/material/CircularProgress';

import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';

import { ChartSchema, SpeciesChart  } from './records';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#records

// -----------------------------------------------------------------------------
// Define Atlas API calls. Six calls, one per chart.

const baseUrl = 'https://records-ws.nbnatlas.org/chart.json?';

const viceCountyUrl = baseUrl + 'x=cl256&qc=&xmissing=false&q=lsid:';
const partnerUrl = baseUrl + 'x=data_provider_uid&qc=&xmissing=false&q=lsid:';
const datasetUrl = baseUrl + 'x=data_resource_uid&qc=&q=lsid:';
const decadeUrl = baseUrl + 'x=decade&qc=&xmissing=false&q=lsid:';
const monthUrl = baseUrl + 'x=month&qc=&xmissing=false&q=lsid:';
const sinceUrl = baseUrl + 'x=year&qc=&fq=year:[1990%20TO%20*]&q=lsid:';

const getViceCountyUrl = (tvk: string): string => { return viceCountyUrl + tvk; }
const getPartnerUrl = (tvk: string): string => { return partnerUrl + tvk; }
const getDatasetUrl = (tvk: string): string => { return datasetUrl + tvk; }
const getDecadeUrl = (tvk: string): string => { return decadeUrl + tvk; }
const getMonthUrl = (tvk: string): string => { return monthUrl + tvk; }
const getSinceUrl = (tvk: string): string => { return sinceUrl + tvk; }

const chartFetcher = (url: string) => fetcher(url, ChartSchema);

// -----------------------------------------------------------------------------

interface ISpeciesRecords {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesRecords({ tvk }: ISpeciesRecords): JSX.Element {

    // Fetch the data for the six charts.
    const viceCounty = useSWR(getViceCountyUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    const partner = useSWR(getPartnerUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    const dataset = useSWR(getDatasetUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    const decade = useSWR(getDecadeUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    const month = useSWR(getMonthUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    const since = useSWR(getSinceUrl(tvk), chartFetcher, {revalidateOnFocus: false});
    
    // Note: must be wrapped in <div> to allow responsive behaviour.
    return (
        <div>
        {(viceCounty.isLoading) ? (<CircularProgress />) : 
          ((viceCounty.error) ? (`Error fetching data: ${viceCounty.error.message}`) : 
            (viceCounty.data) ? (
              <SpeciesChart 
                  data={viceCounty.data.data} 
                  title='By Watsonian Vice County'
                  colour='#FF00007D' />
            ) : '')
        }
        {(partner.isLoading) ? (<CircularProgress />) : 
          ((partner.error) ? (`Error fetching data: ${partner.error.message}`) : 
            (partner.data) ? (
              <SpeciesChart 
                  data={partner.data.data} 
                  title='By data partner'
                  horizontal={true}
                  colour='#00FFFF7D' />
            ) : '')
        }
        {(dataset.isLoading) ? (<CircularProgress />) : 
          ((dataset.error) ? (`Error fetching data: ${dataset.error.message}`) : 
            (dataset.data) ? (
              <SpeciesChart 
                  data={dataset.data.data} 
                  title='By dataset'
                  horizontal={true}
                  colour='#00FF007D' />
            ) : '')
        }
        {(decade.isLoading) ? (<CircularProgress />) : 
          ((decade.error) ? (`Error fetching data: ${decade.error.message}`) : 
            (decade.data) ? (
              <SpeciesChart 
                  data={decade.data.data} 
                  title='By decade'
                  colour='#0000FF7D' />
            ) : '')
        }
        {(month.isLoading) ? (<CircularProgress />) : 
          ((month.error) ? (`Error fetching data: ${month.error.message}`) : 
            (month.data) ? (
              <SpeciesChart 
                  data={month.data.data} 
                  title='By month'
                  colour='#FF00007D' />
            ) : '')
        }
        {(since.isLoading) ? (<CircularProgress />) : 
          ((since.error) ? (`Error fetching data: ${since.error.message}`) : 
            (since.data) ? (
              <SpeciesChart 
                  data={since.data.data} 
                  title='Since 1990'
                  colour='#00FF007D' />
            ) : '')
        }                
        </div>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


