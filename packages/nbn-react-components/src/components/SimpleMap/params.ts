// -----------------------------------------------------------------------------

import * as bigr from 'brc-atlas-bigr';
import * as L from 'leaflet';
import { default as proj4 } from 'proj4';

import { Colour, WmsType } from './const';

// -----------------------------------------------------------------------------

export interface ISimpleMapProps {
    elementId: string;
    tvk: string;
    ds?: string;
    vc?: number;
    zoom?: string;
    bl?: string;
    tr?: string;
    blCoord?: string;
    trCoord?: string;
    w?: number;
    h?: number;
    retina?: number;
    b0from?: number;
    b0to?: number;
    b0fill?: string;
    b1from?: number;
    b1to?: number;
    b1fill?: string;
    b2from?: number;
    b2to?: number;
    b2fill?: string;
    bg?: string;
    res?: string;
    cachedays?: number;
}

// -----------------------------------------------------------------------------

export class Params {
    
    readonly CRS_EPSG_27700 = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs +type=crs';
    readonly CRS_EPSG_4326 = '+proj=longlat +datum=WGS84 +no_defs +type=crs';

    // supplied members
    public props: ISimpleMapProps;
    // derived members
    public elementId: string;
    public tvk: string;
    public bl: string;
    public tr: string;
    public blCoord: string;
    public trCoord: string;
    // calculated members
    public bounds: L.LatLngBounds | null;


    // -------------------------------------------------------------------------
    
    constructor(props: ISimpleMapProps){
        this.props = props;
        this.bounds = null;
        this.elementId = props.elementId;
        // Taxon version key (required)
        this.tvk = this.props.tvk.replace(/[^a-zA-Z0-9]/g, ''); 
        // OS grid reference
        if (this.props.bl !== undefined && this.props.tr !== undefined) {
            this.bl = this.props.bl.replace(/[^a-zA-Z0-9]/g, '');
            this.tr = this.props.tr.replace(/[^a-zA-Z0-9]/g, ''); 
            const blc = this.getLatLngFromGR(this.bl);
            const trc = this.getLatLngFromGR(this.tr);
            if (blc !== null && trc !== null) {
                this.bounds = L.latLngBounds(blc, trc);
            }                     
        } else {
            this.bl = '';
            this.tr = '';
        }
        // Northing, Easting
        if (this.props.blCoord !== undefined && this.props.trCoord !== undefined) {
            this.blCoord = this.props.blCoord.replace(/[^0-9,]/g, '');
            this.trCoord = this.props.trCoord.replace(/[^0-9,]/g, '');
            const blc = this.getLatLngFromNE(this.blCoord);
            const trc = this.getLatLngFromNE(this.trCoord);
            if (blc !== null && trc !== null) {
                this.bounds = L.latLngBounds(blc, trc);
            }
            
        } else {
            this.blCoord = '';
            this.trCoord = '';
        }
    }
    // -------------------------------------------------------------------------
    /** Transform a gridref to a LatLng object. Uses centroid of gridref.
     * 
     * @param {string} gr_str = Grid reference.
     * @returns LatLng object else null if invalid gridref.
     */
    getLatLngFromGR(gr_str: string): L.LatLng|null {
        
        let latLng = null;

        try {            
            const nums = bigr.getCentroid(gr_str, 'wg').centroid;
            latLng = L.latLng(nums[1], nums[0]);
        }
        catch (err) {
            console.error(`(Params::getLatLngFromGR) error: ${gr_str}; ${err}`);
        }

        return latLng;   
    }         
    // -------------------------------------------------------------------------
    /** Transform a Northing,Easting coordinate to a LatLng object.
     * 
     * @param {string} ne_str = Coordinate in format 'Northing,Easting'.
     * @returns LatLng object else null if invalid coordinate.
     */
    getLatLngFromNE(ne_str: string): L.LatLng|null {
        
        let latLng = null;

        try {
            const nums = ne_str.split(',').map(Number);
            const [lng, lat] = proj4(this.CRS_EPSG_27700, this.CRS_EPSG_4326, 
                                     nums);
            latLng = L.latLng(lat, lng);
        }
        catch (err) {
            console.error(`(Params::getLatLngFromNE) error: ${ne_str}; ${err}`);

        }
        return latLng;   
    } 

    // -------------------------------------------------------------------------

    getFill(param: string|null, preset: string): string {

        const p = param || '';
        const fill = p.toUpperCase().replace(/[^A-F0-9]/g, '');
        return fill.length === 6 ? fill : preset;
    }
    // -------------------------------------------------------------------------

    getYear(param: string|null, preset: string): string {

        const p = param || '';
        const yr = p.replace(/[^0-9]/g, '');
        return yr.length === 4 ? yr : preset;
    }

// -----------------------------------------------------------------------------

    getWmsLayer(): L.TileLayer.WMS {

        const colour = Colour.green;
        const queryUrl = this.getWmsQueryUrl();
        console.debug(queryUrl);
        const wmsType: string = WmsType.point
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

    // -------------------------------------------------------------------------

    getWmsQueryUrl(): string {

        const url = `https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*` +
                    `&fq=lsid:${this.tvk}`;
        return url;
    }
           
    // -------------------------------------------------------------------------
    
}
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
