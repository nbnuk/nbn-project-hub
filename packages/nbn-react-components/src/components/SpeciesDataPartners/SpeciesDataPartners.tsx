import { useMemo } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { useDataResource } from '../../lib/advanced/hooks/useDataResource';
import { DatasetTable, IDatasetSchema } from './partners';

// Example page:
// https://species.nbnatlas.org/species/NHMSYS0000504624#data-partners

// -----------------------------------------------------------------------------
// Example API call:
// https://records-ws.nbnatlas.org/occurrences/search.json?q=lsid:NHMSYS0000504624&pageSize=0&flimit=-1&facet=on&facets=data_resource_uid

const baseUrl = 'https://records-ws.nbnatlas.org/occurrences/search.json?pageSize=0&flimit=-1&facet=on&facets=data_resource_uid&q=lsid:';

const getPartnersUrl = (tvk: string): string => { return baseUrl + tvk; }

// -----------------------------------------------------------------------------

interface ISpeciesDataPartners {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesDataPartners({ tvk }: ISpeciesDataPartners): JSX.Element {

    // Get partners
    const searchUrl: string = getPartnersUrl(tvk);
    const { dataResources, error, isValidating} = useDataResource(searchUrl);
    
    // Transform data into format suitable for rendering.
    const datasets = useMemo(() => dataResources?.map((res) => {
        const link: string = 'https://registry.nbnatlas.org/public/show/' + res.uid;
        const dataset: IDatasetSchema = {
            count: res.count,
            drUrn: res.urn,
            link: link,
            name: res.name,
            // TODO: the following two variables need a call to drUrn to populate
            licence: '',
            partner: '',
        }
        return dataset;
    }), [dataResources]);

    return (
        <>
        {(isValidating) ? (<CircularProgress />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (datasets) ? (
              <>
              <DatasetTable datasets={datasets}></DatasetTable>
              </>
            ) : null)
        }              
        </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
