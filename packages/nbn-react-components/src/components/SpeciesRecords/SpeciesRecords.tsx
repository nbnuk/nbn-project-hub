import React from 'react';

import { Spinner } from '@material-tailwind/react';

import { IuseChartData,
         useChartDataTaxon } from '../../shared/hooks/nbn-atlas-api/useChartData';

import { SpeciesChart, TChartType  } from './charts';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#records

// -----------------------------------------------------------------------------

interface ISpeciesRecords {

    tvk: string;
}
// -----------------------------------------------------------------------------

export default function SpeciesRecords({ tvk }: ISpeciesRecords): React.JSX.Element {

  // Construct the array of charts to be displayed 
  const charts: {title: string, response: IuseChartData, colour?: string,
                chartType: TChartType}[] = [                               
      { title: 'By Watsonian Vice County',
        response: useChartDataTaxon({dataType: 'vc', tvk: tvk}),
        colour: '#FF00007D',
        chartType: 'bar_vertical'
      },
      { title: 'By month',
        response: useChartDataTaxon({dataType: 'month', tvk: tvk}),
        colour: '#0000FF7D',
        chartType: 'bar_vertical'
      },
      { title: 'By decade',
        response: useChartDataTaxon({dataType: 'decade', tvk: tvk}),
        colour: '#42F5D77D',
        chartType: 'bar_vertical'
      },
      { title: 'Since 1990',
        response: useChartDataTaxon({dataType: 'since1990', tvk: tvk}),
        colour: '#00FF007D',
        chartType: 'bar_vertical'
      },
      { title: 'By data partner',
        response: useChartDataTaxon({dataType: 'partner', tvk: tvk}),
        colour: '#00FFFF7D',
        chartType: 'bar_horizontal'
      },
      { title: 'By dataset',
        response: useChartDataTaxon({dataType: 'dataset', tvk: tvk}),
        colour: '#00FF007D',
        chartType: 'bar_horizontal'
      }
    ]

    return (
        <div className='grid md:grid-cols-2 gap-4'>
          {charts.map((chart, index) => (chart.response.isLoading) ? (<Spinner key={index}/>) : 
          ((chart.response.error) ? (`Error fetching data ("${chart.title}"): ${chart.response.error.message}. `) : 
            (chart.response.data) ? (
              <SpeciesChart 
                  key={index}
                  data={chart.response.data.data} 
                  title={chart.title}
                  colour={chart.colour}
                  chartType={chart.chartType} />
            ) : '')
          )}              
        </div>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


