import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import useSWR from 'swr';

import { fetcher } from '../../lib/fetcher';
import { useDataResource } from '../../lib/advanced/hooks/useDataResource';
import { getSpeciesNameUrl, speciesNameFetcher } from '../../lib/nameutils';

import { DatasetsCard, ExternalSchema, InfoCards, OnlineResourcesCard, 
        RedlistCards, RedListSchema } from './overview';
import { SpeciesGallery } from '../SpeciesGallery';
import { SpeciesMap } from '../SpeciesMap';

// Example page:
// https://species.nbnatlas.org/species/NHMSYS0000504624#overview

// -----------------------------------------------------------------------------
// Define Atlas API calls: DataSetsCard. 

const baseDataSetsUrl = 'https://records-ws.nbnatlas.org/occurrences/search.json?pageSize=0&flimit=-1&facet=on&facets=data_resource_uid&q=lsid:';

const getDataSetsUrl = (tvk: string): string => { return baseDataSetsUrl + tvk; }

// -----------------------------------------------------------------------------
// Define Atlas API calls: InfoCards. 

const baseExternalUrl = 'https://species.nbnatlas.org/externalSite/eol?';

const getExternalSearchUrl = (tvk: string, sciName: string): string => 
    { return baseExternalUrl + `guid=${tvk}&s=${sciName}`; }

const externalFetcher = (url: string) => fetcher(url, ExternalSchema);

// -----------------------------------------------------------------------------
// Define Atlas API calls: RedListCard. 

const baseRedListUrl = 'https://lists.nbnatlas.org/ws/species/';

const getRedListSearchUrl = (tvk: string): string => 
    { return baseRedListUrl + `${tvk}?isBIE=true`; }

const redListFetcher = (url: string) => fetcher(url, RedListSchema);

// -----------------------------------------------------------------------------

interface ISpeciesOverview {

    tvk: string;
}
// ------

export function SpeciesOverview({ tvk }: ISpeciesOverview): JSX.Element {

    // Get scientific name
    const namesSearchUrl: string = getSpeciesNameUrl(tvk);
    const names = useSWR(namesSearchUrl, speciesNameFetcher, {revalidateOnFocus: false});
    const sciName: string = names.data?.classification.scientificName || '';
    // Get InfoCards data
    const extUrl: string = getExternalSearchUrl(tvk, sciName);
    const ext = useSWR(sciName.length > 0 ? extUrl : null, externalFetcher, {revalidateOnFocus: false});
    // Get RedListCard data
    const redUrl: string = getRedListSearchUrl(tvk);
    const red = useSWR(redUrl, redListFetcher, {revalidateOnFocus: false});
    // Get DataSetsCard data
    const dataUrl: string = getDataSetsUrl(tvk);
    const datasets = useDataResource(dataUrl);
    
    return (
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SpeciesGallery tvk={tvk} maxRows={2} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SpeciesMap tvk={tvk} h={'600'} interactive={'1'} logo={'2'} unconfirmed={'1'} />
        </Grid>        
        {(datasets.isValidating) ? (<CircularProgress />) : 
          ((datasets.error) ? (`Error fetching data: ${datasets.error.message}`) : 
            (names.data && datasets.dataResources) ? (
              <DatasetsCard numDatasets={datasets.dataResources.length}
                sciName={sciName} />
            ) : null)
        }        
        {(red.isLoading) ? (<CircularProgress />) : 
          ((red.error) ? (`Error fetching data: ${red.error.message}`) : 
            (red.data) ? (
                <RedlistCards data={red.data} />
            ) : null)
          }    
        {(names.isLoading || ext.isLoading) ? (<CircularProgress />) : 
          ((names.error || ext.error) ? ('Error fetching data') : 
            (names.data && ext.data && ext.data.taxonConcept.dataObjects) ? (
                <InfoCards dataObjects={ext.data.taxonConcept.dataObjects} />
            ) : null)
          }
        {(names.isLoading) ? (<CircularProgress />) : 
          ((names.error) ? (`Error fetching data: ${names.error.message}`) : 
            (names.data) ? (
                <OnlineResourcesCard sciName={sciName} tvk={tvk} />
            ) : null)
          }
        </Grid>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


