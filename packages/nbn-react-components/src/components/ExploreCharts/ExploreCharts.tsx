import { Spinner } from '@material-tailwind/react';

import { IExploreMap } from '../../shared/lib/types';

import { IuseChartData,
         useChartDataLoc,
         useChartDataTaxon } 
         from '../../shared/hooks/nbn-atlas-api/useChartData';

import { SpeciesChart, TChartType  } from '../SpeciesRecords/charts';

// -----------------------------------------------------------------------------

export default function ExploreCharts(props: IExploreMap): React.JSX.Element {
    const { isGroup, location, name } = props;

    // Restrict returned data to a specific taxon if not group.
    const sciName: string|undefined = (isGroup) ? undefined : name;
    // Construct the array of charts to be displayed 
    const charts: {title: string, response: IuseChartData, colour?: string,
                  chartType: TChartType}[] = [                               
        { title: 'By month (local)',
          response: useChartDataLoc(location, {dataType: 'month', sciName}),
          colour: '#0000FF7D',
          chartType: 'bar_vertical'
        },
        { title: 'By month (UK)',
          response: useChartDataTaxon({dataType: 'month', sciName}),
          colour: '#0000FF7D',
          chartType: 'bar_vertical'
        },
        { title: 'By decade (local)',
          response: useChartDataLoc(location, {dataType: 'decade', sciName}),
          colour: '#42F5D77D',
          chartType: 'bar_vertical'
        },
        { title: 'By decade (UK)',
          response: useChartDataTaxon({dataType: 'decade', sciName}),
          colour: '#42F5D77D',
          chartType: 'bar_vertical'
        },         
        { title: 'Since 1990 (local)',
          response: useChartDataLoc(location, {dataType: 'since1990', sciName}),
          colour: '#00FF007D',
          chartType: 'bar_vertical'
        },
        { title: 'Since 1990 (UK)',
          response: useChartDataTaxon({dataType: 'since1990', sciName}),
          colour: '#00FF007D',
          chartType: 'bar_vertical'
        },        
        { title: 'By Watsonian Vice County (local)',
          response: useChartDataLoc(location, {dataType: 'vc', sciName}),
          colour: '#FF00007D',
          chartType: 'bar_vertical'
        },
        { title: 'By Watsonian Vice County (UK)',
          response: useChartDataTaxon({dataType: 'vc', sciName}),
          colour: '#FF00007D',
          chartType: 'bar_vertical'
        },        
        { title: 'By country (local)',
          response: useChartDataLoc(location, {dataType: 'country', sciName}),
          colour: '#FFFF007D',
          chartType: 'bar_vertical'
        },
        { title: 'By country (UK)',
          response: useChartDataTaxon({dataType: 'country', sciName}),
          colour: '#FFFF007D',
          chartType: 'bar_vertical'
        },
        { title: 'By licence (local)',
          response: useChartDataLoc(location, {dataType: 'licence', sciName}),
          chartType: 'doughnut'
        },
        { title: 'By licence (UK)',
          response: useChartDataTaxon({dataType: 'licence', sciName}),
          chartType: 'doughnut'
        },                 
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
