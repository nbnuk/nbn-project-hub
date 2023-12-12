import React from 'react';

import { Spinner } from '@material-tailwind/react';

import { getDatasetUrl, 
         getDecadeUrl, 
         getMonthUrl, 
         getPartnerUrl, 
         getSinceUrl, 
         getViceCountyUrl, 
         useChartData } from '../../shared/hooks/nbn-atlas-api/useChartData';

import { SpeciesChart  } from './records';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#records

// -----------------------------------------------------------------------------

interface ISpeciesRecords {

    tvk: string;
}
// -----------------------------------------------------------------------------

export default function SpeciesRecords({ tvk }: ISpeciesRecords): React.JSX.Element {

    // Fetch the data for the six charts.
    const viceCounty = useChartData(getViceCountyUrl(tvk));
    const partner = useChartData(getPartnerUrl(tvk));
    const dataset = useChartData(getDatasetUrl(tvk));
    const decade = useChartData(getDecadeUrl(tvk));
    const month = useChartData(getMonthUrl(tvk));
    const since = useChartData(getSinceUrl(tvk));
    
    // Note: must be wrapped in <div> to allow responsive behaviour.
    return (
        <div>
        {(viceCounty.isLoading) ? (<Spinner />) : 
          ((viceCounty.error) ? (`Error fetching data: ${viceCounty.error.message}`) : 
            (viceCounty.data) ? (
              <SpeciesChart 
                  data={viceCounty.data.data} 
                  title='By Watsonian Vice County'
                  colour='#FF00007D' />
            ) : '')
        }
        {(partner.isLoading) ? (<Spinner />) : 
          ((partner.error) ? (`Error fetching data: ${partner.error.message}`) : 
            (partner.data) ? (
              <SpeciesChart 
                  data={partner.data.data} 
                  title='By data partner'
                  horizontal={true}
                  colour='#00FFFF7D' />
            ) : '')
        }
        {(dataset.isLoading) ? (<Spinner />) : 
          ((dataset.error) ? (`Error fetching data: ${dataset.error.message}`) : 
            (dataset.data) ? (
              <SpeciesChart 
                  data={dataset.data.data} 
                  title='By dataset'
                  horizontal={true}
                  colour='#00FF007D' />
            ) : '')
        }
        {(decade.isLoading) ? (<Spinner />) : 
          ((decade.error) ? (`Error fetching data: ${decade.error.message}`) : 
            (decade.data) ? (
              <SpeciesChart 
                  data={decade.data.data} 
                  title='By decade'
                  colour='#0000FF7D' />
            ) : '')
        }
        {(month.isLoading) ? (<Spinner />) : 
          ((month.error) ? (`Error fetching data: ${month.error.message}`) : 
            (month.data) ? (
              <SpeciesChart 
                  data={month.data.data} 
                  title='By month'
                  colour='#FF00007D' />
            ) : '')
        }
        {(since.isLoading) ? (<Spinner />) : 
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


