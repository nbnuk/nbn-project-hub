
import { useDataResource } from '../../shared/hooks/nbn-atlas-api/useDataResource';
import { sanitiseParam, sanitiseParamList } from './sanitise';

// -------------------------------------------------------------------------

export interface IMapDataResourceList {
  /** Taxon version key representing the observed species to be mapped. */
  tvk: string;
    /** Link to a CSS file to override default CSS settings. */
  ds?: string;
  /** Enable/disable the list of datasets. Enabled by default. ('0' or '1'). */
  refs?: string;
  /** Width, in pixels, of the map. If neither height nor width specified 
   * the width is 350. */
  w?: string;
}

// -----------------------------------------------------------------------------

export default function MapDataResourceList({tvk, ds, refs, w}: IMapDataResourceList): JSX.Element {
   
    const url = `http://records-ws.nbnatlas.org/occurrences/search?q=lsid:${tvk}&fq=-occurrence_status:absent&facets=data_resource_uid&flimit=-1&pageSize=0`;
    const { dataResources, error, isValidating } = useDataResource(url);

    const showRef = sanitiseParamList('refs', refs, ['0', '1'], '1');
  
    if (showRef === '0') {
      return (<></>);
    }
    
    if (error) return <div>Error: {error.message}</div>

    if (isValidating) return <div>Loading...</div>

    const san_w = parseInt(sanitiseParam('w', w, /[^0-9]/g, '350'));
    // Set up filtering of data sources to include only those requested
    const san_ds = sanitiseParam('ds', ds, /[^a-zA-Z0-9,]/g);
    const no_ds = san_ds.length === 0;
    const ds_array = san_ds.split(',');
    const filterDataResources = dataResources?.filter(dataResource => 
      { return dataResource.uid === undefined ? false : 
            no_ds || ds_array.includes(dataResource.uid) });

    return (
      <div style={{width: san_w}}>
        <p>The following datasets are included:</p>
        <ul>
          {filterDataResources?.map(dataResource => (
            <li key={dataResource.uid}>
              <div>
                <a href={dataResource.urn}>{dataResource.name}</a> 
                    <span> ({dataResource.uid})</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
