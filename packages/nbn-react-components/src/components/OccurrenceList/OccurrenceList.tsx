import { useOccurrenceSearch, Occurrence } from '../../shared/hooks/nbn-atlas-api/useOccurrenceSearch';
import '../../index.css'
import { NBNDate } from '../ui-components';



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
        <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Media</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Name</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Rank</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Observed</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Place</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">OSGrid</th>
          <th className="tw-border-b dark:tw-border-slate-600 tw-font-medium tw-p-4 tw-pt-0 tw-pb-3 tw-text-slate-400 dark:tw-text-slate-200 tw-text-left">Data Resource</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        {occurrenceSearchResult?.occurrences.map((occurrence: Occurrence) => (
          <tr key={occurrence.uuid} className="odd:bg-slate-50">
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.thumbnailUrl && <img src={occurrence.thumbnailUrl} alt="Thumbnail" className="h-75" style={{ width: '75px', height: '75px' }}/>}</td>
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.vernacularName} <br />({occurrence.scientificName})</td>
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.taxonRank}</td>
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left"><NBNDate timestamp={occurrence.eventDate} /></td>
            {/* <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.eventDate}</td> */}
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.stateProvince}</td>
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.gridReference}</td>
            <td className="tw-border-b border-slate-100 dark:border-slate-700 tw-p-4 text-slate-500 dark:tw-text-slate-400 tw-text-left">{occurrence.dataResourceName}</td>
          </tr>
        ))}

      </tbody>

    </table>

  </>


  );
};

export default OccurrenceList;



