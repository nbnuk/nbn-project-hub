import { useDataResource, DataResource } from '../../shared/hooks/nbn-atlas-api/useDataResource';
import { validateOccurrenceSearchApiUrl } from '../../shared/lib/apiUrl';
import '../../index.css'
import {List1} from '../ui-components';
import { List, ListItem, ListItemSuffix,  Chip, Card } from "@material-tailwind/react";


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
   
   <Card className="w-96">
      <List>

      {dataResources?.map((dataResource: DataResource) => (
        <a href={dataResource.urn} className="text-initial">
          <ListItem>{dataResource.name}
          <ListItemSuffix className="pl-2">
            <Chip
              value={dataResource.count}
              variant="ghost"
              size="sm"
              className="rounded-full"
              color="blue"
            />
          </ListItemSuffix>
          </ListItem>
        </a>
))}
      </List>
    </Card>

    </>
);

};

export default DataResourceList;
