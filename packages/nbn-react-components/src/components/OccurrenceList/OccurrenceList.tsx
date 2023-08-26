import useSWR from 'swr';
import '../../index.css'

export interface OccurrenceListProps { 
  apiUrl: string;
}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (data.status != 'OK') {
    throw new Error('Network response was not ok');
  }

  return new ApiResponse(data);
};

export const OccurrenceList = ({ apiUrl }: OccurrenceListProps) => {
  const { data, error, isValidating } = useSWR(apiUrl, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (isValidating) return <div>Loading...</div>;

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
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.vernacularName} <br/>({occurrence.scientificName})</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.taxonRank}</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{new Date(occurrence.eventDate).toISOString().split('T')[0]}</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.stateProvince}</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-left">{occurrence.gridReference}</td>
    </tr>
))}

    </tbody>
    
    </table>
    {/* <a href={`/occurrences/${occurrence.uuid}`} className="btn btn-primary btn-sm">View record</a> */}
</>


  );
};

export default OccurrenceList;

class ApiResponse {
  pageSize: number;
  startIndex: number;
  totalRecords: number;
  sort: string;
  dir: string;
  status: string;
  occurrences: Occurrence[];
  // ... other properties ...

  constructor(data: any) {
      this.pageSize = data.pageSize;
      this.startIndex = data.startIndex;
      this.totalRecords = data.totalRecords;
      this.sort = data.sort;
      this.dir = data.dir;
      this.status = data.status;
      this.occurrences = data.occurrences.map((o: any) => new Occurrence(o));
      // ... other properties ...
  }
}

class Occurrence {
  uuid: string;
  occurrenceID: string;
  scientificName: string;
  vernacularName: string; // Common name of the species
  taxonRank: string;
  eventDate: number;
  country: string;
  stateProvince: string;
  gridReference: string;
  dataResourceName: string;
  basisOfRecord: string;

  constructor(data: any) {
      this.uuid = data.uuid || '';
      this.occurrenceID = data.occurrenceID || ''; 
      this.scientificName = data.scientificName || '';
      this.vernacularName = data.vernacularName || '';
      this.taxonRank = data.taxonRank || '';
      this.eventDate = data.eventDate || null;
      this.country = data.country || '';
      this.stateProvince = data.stateProvince || '';
      this.gridReference = data.gridReference || '';
      this.dataResourceName = data.dataResourceName || '';
      this.basisOfRecord = data.basisOfRecord || '';
  }
}

