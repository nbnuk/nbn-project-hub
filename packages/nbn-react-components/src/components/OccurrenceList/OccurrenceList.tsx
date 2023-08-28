import useSWR from 'swr';
import { z } from "zod";
import { fetcher } from '../../lib/fetcher';
import { format } from 'date-fns';
import '../../index.css'

export const OccurrenceSchema = z.object({
  uuid: z.string(),
  occurrenceID: z.string(),
  scientificName: z.string().optional(),
  vernacularName: z.string().optional(),
  taxonRank: z.string().optional(),
  eventDate: z.number().optional(),
  country: z.string().optional(),
  stateProvince: z.string().optional(),
  gridReference: z.string().optional(),
  dataResourceName: z.string().optional(),
  basisOfRecord: z.string().optional(),
});

export const OccurrenceSearchResultSchema = z.object({
  pageSize: z.number(),
  startIndex: z.number(),
  totalRecords: z.number(),
  sort: z.string(),
  dir: z.string(),
  status: z.string(),
  occurrences: z.array(OccurrenceSchema),
});

export type Occurrence = z.TypeOf<typeof OccurrenceSchema>;
export type OccurrenceSearchResult = z.TypeOf<typeof OccurrenceSearchResultSchema>;

const occurrenceFetcher = (url: string) => fetcher(url, OccurrenceSearchResultSchema);

export interface OccurrenceListProps {
  occurrenceSearchApiUrl: string;
}



export const OccurrenceList = ({ occurrenceSearchApiUrl }: OccurrenceListProps) => {
  const { data, error, isValidating } = useSWR(occurrenceSearchApiUrl, occurrenceFetcher, { revalidateOnFocus: false });

  if (error) return <div>Error: {error.message}</div>

  if (isValidating) return <div>Loading...</div>


  return (<>
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Taxon Rank</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Observed</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Place</th>
          <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">OSGrid</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        {data?.occurrences.map((occurrence: Occurrence) => (
          <tr key={occurrence.uuid} className="odd:bg-slate-50">
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.vernacularName} <br />({occurrence.scientificName}) <br /> {occurrence.uuid}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.taxonRank}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.eventDate ? format(new Date(occurrence.eventDate), 'yyyy-MM-dd') : ''}</td>
            {/* <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.eventDate}</td> */}
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.stateProvince}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.gridReference}</td>
          </tr>
        ))}

      </tbody>

    </table>

  </>


  );
};

export default OccurrenceList;



