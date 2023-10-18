import useSWR from 'swr';
import { z } from "zod";
import { fetcher } from '../../shared/lib/fetcher';
import { useOccurrenceSearch } from '../../shared/hooks/useOccurrenceSearch';
import { format } from 'date-fns';
import '../../index.css'
import { Occurrence } from '../../shared/types';
import { NBNDate } from '../ui-components';



// export const OccurrenceSchema = z.object({
//   uuid: z.string(),
//   occurrenceID: z.string(),
//   scientificName: z.string().optional(),
//   vernacularName: z.string().optional(),
//   taxonRank: z.string().optional(),
//   eventDate: z.number().optional(),
//   country: z.string().optional(),
//   stateProvince: z.string().optional(),
//   gridReference: z.string().optional(),
//   dataResourceName: z.string().optional(),
//   basisOfRecord: z.string().optional(),
//   thumbnailUrl: z.string().optional(),
//   thumbWidth: z.string().optional(),
//   thumbHeight: z.string().optional(),
// });

// export const OccurrenceSearchResultSchema = z.object({
//   pageSize: z.number(),
//   startIndex: z.number(),
//   totalRecords: z.number(),
//   sort: z.string(),
//   dir: z.string(),
//   status: z.string(),
//   occurrences: z.array(OccurrenceSchema),
// });

// export type Occurrence = z.TypeOf<typeof OccurrenceSchema>;
// export type OccurrenceSearchResult = z.TypeOf<typeof OccurrenceSearchResultSchema>;

// const occurrenceFetcher = (url: string) => fetcher(url, OccurrenceSearchResultSchema);

export interface OccurrenceListProps {
  occurrenceSearchApiUrl: string;
}



const OccurrenceList = ({ occurrenceSearchApiUrl }: OccurrenceListProps) => {
  const { occurrenceSearchResult, error, isValidating } = useOccurrenceSearch(occurrenceSearchApiUrl);

  if (error) return <div>Error: {error.message}</div>

  if (isValidating) return <div>Loading...</div>


  return (<>
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
        <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Media</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Rank</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Observed</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Place</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">OSGrid</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Data Resource</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        {occurrenceSearchResult?.occurrences.map((occurrence: Occurrence) => (
          <tr key={occurrence.uuid} className="odd:bg-slate-50">
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.thumbnailUrl && <img src={occurrence.thumbnailUrl} alt="Thumbnail" className="h-75" style={{ width: '75px', height: '75px' }}/>}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.vernacularName} <br />({occurrence.scientificName})</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.taxonRank}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left"><NBNDate timestamp={occurrence.eventDate} /></td>
            {/* <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.eventDate}</td> */}
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.stateProvince}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.gridReference}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.dataResourceName}</td>
          </tr>
        ))}

      </tbody>

    </table>

  </>


  );
};

export default OccurrenceList;



