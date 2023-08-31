import { useDataResource } from '../../lib/advanced/hooks/useDataResource';
import { validateOccurrenceSearchApiUrl } from '../../lib/apiUrl';


export interface SimpleDataResourceComponentProps { 
  apiOccurrenceSearchURL: string;
}


export const SimpleDataResourceComponent = ({ apiOccurrenceSearchURL }: SimpleDataResourceComponentProps) => {

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
  return (
    <div>
      {dataResources?.map(dataResource => (
        <div key={dataResource.uid} className="pb-3" >
          <h2>{dataResource.name}</h2>
          <p>urn: {dataResource.urn}</p>
          <p>count: {dataResource.count}</p>
        </div>
      ))}
    </div>
  );
};

export default SimpleDataResourceComponent;
