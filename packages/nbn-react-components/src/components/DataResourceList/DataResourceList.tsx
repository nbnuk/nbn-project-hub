import { useDataResource } from '../../shared/hooks/useDataResource';
import { validateOccurrenceSearchApiUrl } from '../../shared/lib/apiUrl';
import '../../index.css'
import {List1} from '../ui-components';


export interface DataResourceListProps { 
  apiOccurrenceSearchURL: string;
  width?: string
}


export const DataResourceList = ({ apiOccurrenceSearchURL, width = 'auto' }: DataResourceListProps) => {

  // Validate the occurrence search API URL
  const validatedApiUrl = validateOccurrenceSearchApiUrl(apiOccurrenceSearchURL);
  if (validatedApiUrl instanceof Error) {
    return <div>Error: {validatedApiUrl.message}</div>;
  }

  // Use the useDataResource hook to fetch the data resources
  const { dataResources, error, isValidating } = useDataResource(validatedApiUrl);

  if (error) return <div>Error: {error.message}</div>

  if (isValidating) return <div>Loading...</div>

  // Render the data resources
  return (<>
   

<div className="container mx-auto p-4 bg-white" style={{width}}>
  {dataResources && <List1 items={dataResources}
  renderItem={(dataResource, index) => <><div><a href={dataResource.urn} className="text-blue-500">{dataResource.name}</a></div>
  <div>Records: {dataResource.count}</div></>}
  />}
</div>



    </>
);

};

export default DataResourceList;
