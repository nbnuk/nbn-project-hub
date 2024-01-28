import { useDataResource, DataResource } from '../../shared/hooks/nbn-atlas-api/useDataResource';
import { validateOccurrenceSearchApiUrl } from '../../shared/lib/apiUrl';
import '../../index.css'
import { List, ListItem, ListItemIcon,ListItemText,  Chip, Card } from "@mui/material";


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
   
   <Card className="tw-w-96">
      <List>

      {dataResources?.map((dataResource: DataResource) => (
        <a href={dataResource.urn} className="text-initial">
          <ListItem>
          <ListItemText primary={dataResource.name} />
          <ListItemIcon className="tw-justify-end tw-pl-2">
            <Chip
              label={dataResource.count}
              size="small"
              className="tw-rounded-full"
              color="primary"
            />
          </ListItemIcon>
          </ListItem>
        </a>
))}
      </List>
    </Card>

    </>
);

};

export default DataResourceList;
