import useSWR from 'swr';
import { z } from "zod";
import { fetcher } from '../../lib/fetcher';
import '../../index.css'

/**
 * TemplateDataFetchingComponent: A starter template for creating a new component.
 * This template includes the essential libraries and patterns 
 * used in our application such as useSWR for data fetching, 
 * zod for schema validation and type inference, and tailwindcss for styling.
 * 
 * You can customize this template according to your needs, 
 * it is just a guide to get you started and make sure you are using the correct libraries.
 */



// Define the schema for a single data item
export const DataSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean()
});

// Define the schema for a list of data items
export const DataListSchema = z.array(DataSchema);

// Define types for data and data list
export type Data = z.TypeOf<typeof DataSchema>;
export type DataList = z.TypeOf<typeof DataListSchema>;

// Define a fetcher for the data list
const dataListFetcher = (url:string) => fetcher(url, DataListSchema);

// Define the props for the component
export interface TemplateDataFetchingComponentProps { 
  apiURL: string;
}

// Define the component
export const TemplateDataFetchingComponent = ({ apiURL }: TemplateDataFetchingComponentProps) => {

  // Fetch, cache, and revalidate the data list from the API using useSWR
  // data: the data list fetched from the API
  // error: error returned by the API or validation error
  // isValidating: true while the request is being made and the response is being validated
  const { data, error, isValidating } = useSWR(apiURL, dataListFetcher, { revalidateOnFocus: false });

  // Show error message if there is an error
  if (error) return <div>Error: {error.message}</div>

  // Show loading message while validating
  if (isValidating) return <div>Loading...</div>

  
  // Render the data list
  return (
    <div>
      {data?.map((dataItem: Data) => (
        <div key={dataItem.id}>
          <h2>{dataItem.userId}</h2>
          <p>{dataItem.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateDataFetchingComponent;
