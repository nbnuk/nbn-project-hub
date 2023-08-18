// -----------------------------------------------------------------------------

import { Colour, WmsType } from "./const";
import * as L from 'leaflet';

// -----------------------------------------------------------------------------

export async function getGeojsonLayer(filename: string) {
    
    try {
        const response = await fetch(filename);
        const data = await response.json();
        return L.geoJson(data);
    } catch(err) {
        console.error(`getGeojsonFile error (${filename}): ${err}`);
        throw err;
    }        
}
// -----------------------------------------------------------------------------

export async function getWktFile(filename: string) {

    try {
        const response = await fetch(filename);
        const data = await response.text();
        return data;
    } catch (err) {
        console.error(`getWktFile error (${filename}): ${err}`);
        throw err;
    }
}
// -----------------------------------------------------------------------------

export function getWmsLayer(species: string, year: number, 
                            colour: string|null = null, 
                            wmsType: string = WmsType.point,
                            wkt: string|null = null) {
    
    colour = colour || Colour.green;
    const queryUrl = getWmsQueryUrl(species, year, wkt);
    console.debug(queryUrl);
    const env = `${wmsType};color:${colour}`;
    const tileLayer  = L.tileLayer.wms(queryUrl, {
        layers: "ALA:occurrences",
        format: "image/png",
        uppercase: true,
        // @ts-ignore: WMSOptions does not have these NBN-specific members
        color: colour,
        outline:"true",
        ENV: env
    });	 
    
    return tileLayer;
}
// -----------------------------------------------------------------------------
// Local Functions
// -----------------------------------------------------------------------------

function getWmsQueryUrl(species: string, year: number, wkt: string|null): string {
    
    let txt = `https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*` +
                `&fq=species:%22${species}%22%20AND%20occurrence_date:` +
                `[${year}-01-01T00:00:00Z TO ${year}-12-31T00:00:00Z]`;
    
    if (wkt !== null) {
        txt = txt + `&wkt=${wkt}`
    }
    return txt;
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
