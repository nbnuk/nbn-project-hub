import { useDataResource } from '../../lib/advanced/hooks/useDataResource';
import { validateOccurrenceSearchApiUrl } from '../../lib/apiUrl';


export interface SimpleDataResourceListProps { 
  apiOccurrenceSearchURL: string;
  width?: string
}


export const SimpleDataResourceList = ({ apiOccurrenceSearchURL, width = 'auto' }: SimpleDataResourceListProps) => {

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
  <div className="container mx-auto p-4" style={{width}}>
      <ul>
        {dataResources?.map(dataResource => (
          <li key={dataResource.uid} className="mb-2">
            <div className="font-bold">
              <a href={dataResource.urn} className="text-blue-500">{dataResource.name}</a>
            </div>
            <div className="text-gray-700">Records: {dataResource.count}</div>
          </li>
        ))}
      </ul>
    </div>
    </>
);

};

export default SimpleDataResourceList;
