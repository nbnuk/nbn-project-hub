import { useEffect, useMemo, useRef } from 'react';

import { z } from 'zod';

// -----------------------------------------------------------------------------
// Use the following import to include all options for dev purposes:
// import Chart from 'chart.js/auto';

// However, for prod use the following explicit imports to allow tree-shaking:
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
  
Chart.register(
    BarController,
    BarElement,    
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip
);

// See the following for further information:
// https://www.chartjs.org/docs/latest/getting-started/integration.html#bundle-optimization
  
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

type TContainerSchema = z.TypeOf<typeof ContainerSchema>;

export const ChartSchema = z.object({
    data: z.array(ContainerSchema),
    x: z.string().nullish(),
    xLabel: z.string().nullish(),
})
// -----------------------------------------------------------------------------
// Return data in a format suitable for charting.

function getChartData( dataSchema: TContainerSchema[], colour?: string) {

    const [values, labels] = transformData(dataSchema);
    const chartData = {
        labels,
        datasets: [
        {
            data: values,
            backgroundColor: colour || 'rgba(99, 255, 99, 0.5)',
            borderColor: 'LightGray',
            borderWidth: 1
        }
        ]
    };
    return chartData;
}
// -----------------------------------------------------------------------------
// Return chart options.

function getChartOptions(horizontal?: boolean, title?: string) {

    const chartOptions = {
        responsive: true,
        indexAxis: horizontal ? 'y' as const: 'x' as const,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            align: 'start' as const,
            display: true,
            text: title,
            font: {
                size: 18,
            }
          },
        },
        scales: {           
            y: {
              ticks: {
                autoSkip: true,
              }
            }
          }
    };
    return chartOptions;
}
// -----------------------------------------------------------------------------
// Transform data into a format suitable for charting.

function transformData(dataSchema: TContainerSchema[], 
                        sort: boolean = false): [number[], string[]] {

    const labels: string[] = [];    // Axis labels.
    const values: number[] = [];    // Axis values.

    if (dataSchema.length > 0) {
        if (sort) {
            dataSchema[0].data.sort((a, b) => {
                const ac = a.count ??= 0;
                const bc = b.count ??= 0;
                return (ac > bc) ? -1 : (ac < bc) ? 1 : 0;
            });
        }
        dataSchema[0].data.map((record) => {
            labels.push(record.label ??= '');
            values.push(record.count ??= 0);
        });
    }
    return [values, labels];
}
// -----------------------------------------------------------------------------
  
interface IChart {
    /** Hex string representing bar colour. */
    colour?: string;
    /** Data returned by Atlas API call. */
    data: TContainerSchema[];
    /** True if chart is horizontal. Vertical by default. */
    horizontal?: boolean;
    /** Title of chart. */
    title: string;
}
// -----------------------------------------------------------------------------

export function SpeciesChart({ colour, data, horizontal, title }: IChart): JSX.Element {

    const chartData = useMemo(() =>getChartData(data, colour), [data, colour]);
    const chartOptions = getChartOptions(horizontal, title);
    const chartRef = useRef<Chart | null>(null);
  
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {        
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
          });
        }
    };      
  
    useEffect(() => {
        if (chartRef.current) {
          chartRef.current.data = chartData;
          chartRef.current.update();
        }
    }, [chartData]);
  
    return (
        <canvas ref={canvasCallback} />
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
