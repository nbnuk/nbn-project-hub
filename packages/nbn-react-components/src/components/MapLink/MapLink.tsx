
import { sanitiseParam, sanitiseParamList } from './sanitise';

// -------------------------------------------------------------------------

export interface IMapLinkProps {
  /** Taxon version key representing the observed species to be mapped. */
  tvk: string;
  /** Enable/disable the link. Enabled by default. ('0' or '1'). */
  link?: string;
  /** Width, in pixels, of the link text. Default width is 350. */
  w?: string;  
}

// -----------------------------------------------------------------------------

export default function MapLink({tvk, link, w}: IMapLinkProps): JSX.Element {
   
    const san_link = sanitiseParamList('link', link, ['0', '1'], '1');
  
    if (san_link === '0') {
      return (<></>);
    }

    const url = `https://records.nbnatlas.org/occurrences/search?q=${tvk}#tab_mapView`;
    const san_w = parseInt(sanitiseParam('w', w, /[^0-9]/g, '350'));
    
    return (
      <div style={{width: san_w}}>
        <a href={url} target='_blank'>Open interactive map in new window</a>
      </div>
    )
  }

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
