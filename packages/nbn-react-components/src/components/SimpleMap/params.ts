// -----------------------------------------------------------------------------

import * as bigr from 'brc-atlas-bigr';
import * as L from 'leaflet';
import { default as proj4 } from 'proj4';

import { Colour } from './const';

import Boundaries from './assets/VC_boundaries.json';

// -----------------------------------------------------------------------------

export interface ISimpleMapProps {
    elementId: string;
    tvk: string;
    bl?: string;
    tr?: string;
    blCoord?: string;
    trCoord?: string;
    b0from?: string;
    b0to?: string;
    b0fill?: string;
    b0bord?: string;
    b1from?: string;
    b1to?: string;
    b1fill?: string;
    b1bord?: string;
    b2from?: string;
    b2to?: string;
    b2fill?: string;
    b2bord?: string;
    bg?: string;
    cachedays?: number;
    ds?: string;
    gd?: string;
    h?: string;
    w?: string;
    retina?: number;
    res?: string;
    vc?: string;
    zoom?: string;
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
    public b0from: string;
    public b0to: string;
    public b0fill: string;
    public b1from: string;
    public b1to: string;
    public b1fill: string;
    public b2from: string;
    public b2to: string;
    public b2fill: string;
    public bg: string;
    public ds: string;
    public h: string;
    public w: string;
    public res: string;
    public vc: string;
    public zoom: string;
    // calculated members
    public bounds: L.LatLngBounds | null;
    public druidurl: string;
    public map_grid_size: string
    public rangeurl0: string;
    public rangeurl1: string;
    public rangeurl2: string;


    // -------------------------------------------------------------------------
    
    constructor(props: ISimpleMapProps){
        this.props = props;
        this.bounds = null;
        this.elementId = props.elementId;
        // tvk: taxon version key (required)
        this.tvk = this.props.tvk.replace(/[^a-zA-Z0-9]/g, ''); 
        // bl, tr: OS grid reference boundary
        if (this.checkPairParams('bl', this.props.bl, 'tr', this.props.tr)) {
            this.bl = this.sanitiseParam('bl', this.props.bl, /[^a-zA-Z0-9]/g); 
            this.tr = this.sanitiseParam('tr', this.props.tr, /[^a-zA-Z0-9]/g); 
            const blc = this.getLatLngFromGR(this.bl);
            const trc = this.getLatLngFromGR(this.tr);
            if (blc !== null && trc !== null) {
                this.bounds = L.latLngBounds(blc, trc);
            }                     
        } else {
            this.bl = '';
            this.tr = '';
        }
        // blCoord, trCoord: Northing, Easting bonundary
        if (this.checkPairParams('blCoord', this.props.blCoord, 'trCoord', this.props.trCoord)) {
            this.blCoord = this.sanitiseParam('blCoord', this.props.blCoord, /[^0-9,]/g); 
            this.trCoord = this.sanitiseParam('trCoord', this.props.trCoord, /[^0-9,]/g); 
            const blc = this.getLatLngFromNE(this.blCoord);
            const trc = this.getLatLngFromNE(this.trCoord);
            if (blc !== null && trc !== null) {
                this.bounds = L.latLngBounds(blc, trc);
            }
        } else {
            this.blCoord = '';
            this.trCoord = '';
        }

        // b0from, b0to, b0fill: Lower data layer
        let db = this.getDateBand('b0from', this.props.b0from, 'b0to', this.props.b0to);
        this.b0from = db[0];
        this.b0to = db[1];
        this.rangeurl0 = db[2];
        this.b0fill = this.sanitiseFill('b0fill', this.props.b0fill, 'FFFF00');
        // b1from, b1to, b1fill: Middle data layer
        db = this.getDateBand('b1from', this.props.b1from, 'b1to', this.props.b1to);
        this.b1from = db[0];
        this.b1to = db[1];
        this.rangeurl1 = db[2];
        this.b1fill = this.sanitiseFill('b1fill', this.props.b0fill, 'FF00FF');
        // b2from, b2to, b2fill: Upper data layer
        db = this.getDateBand('b2from', this.props.b2from, 'b2to', this.props.b2to);
        this.b2from = db[0];
        this.b2to = db[1];
        this.rangeurl2 = db[2];
        this.b2fill = this.sanitiseFill('b2fill', this.props.b2fill, '00FFFF');
        // bg
        this.bg = this.sanitiseParamList('bg', this.props.bg, ['vc']); 
        // ds
        this.ds = this.sanitiseParam('ds', this.props.ds, /[^a-zA-Z0-9,]/g);
        if (this.ds.length > 0) {
            this.druidurl = '+AND+(data_resource_uid:' + 
                    this.ds.split(',').join('+OR+data_resource_uid:') + 
                    ')';
        } else {
            this.druidurl = '';
        }
        // h, w
        this.h = this.sanitiseParam('h', this.props.h, /[^0-9]/g);
        this.w = this.sanitiseParam('w', this.props.w, /[^0-9]/g);
        // res
        this.res = this.sanitiseParamList('res', this.props.res, 
            ['50km', '10km', '2km', '1km', '100m']); 
        if (this.res !== '') {
            this.map_grid_size = `fixed_${this.res}`;
        } else {
            this.map_grid_size = 'fixed_10km';
        }
        // vc
        this.vc = this.sanitiseParam('vc', this.props.vc, /[^a-zA-Z0-9]/g); 
        if (this.vc !== '') {
            this.calcBoundary('vc', this.vc);
        }
        // zoom
        this.zoom = this.sanitiseParamList('zoom', this.props.zoom, ['england',
            'scotland', 'wales', 'highland', 'sco-mainland', 'outer-heb', 'uk']); 
        if (this.zoom !== '') {
                this.calcBoundary('zoom', this.zoom);
        }        
        // Skipped parameters
        this.skipParam('gd', this.props.gd);
        this.skipParam('b0bord', this.props.b0bord);
        this.skipParam('b1bord', this.props.b1bord);
        this.skipParam('b2bord', this.props.b2bord);
        this.skipParam('cachedays', this.props.cachedays);
        this.skipParam('retina', this.props.retina);
        // Final data integrity checks...
        
        const bcount =  (this.bl.length > 0 ? 1 : 0) +
                        (this.blCoord.length > 0 ? 1 : 0) +
                        (this.vc.length > 0 ? 1 : 0) +
                        (this.zoom.length > 0 ? 1 : 0);
        if (bcount === 0) {
            // Set default view as none specified
            this.calcBoundary('default', 'uk');
        }
        else if (bcount > 1) {
            // Warn if multiple boundary parameters have been supplied
            console.warn("Multiple boundary parameters have been supplied. " +
                "Only one of '[bl,tr]', '[blCoord,trCoord]', 'vc', or 'zoom' " +
                "will be used.");
        }        

    }
    // -------------------------------------------------------------------------
    /** Set the boundary coords for a specified boundary ID (e.g. VC 39)
     * 
     * @param {string} name - Name of parameter.
     * @param boundary_id - Value of parameter.
     */
    calcBoundary(name: string, boundary_id: string): void {
        const idl = boundary_id.toLocaleLowerCase();
        let found = false;
        // Iterate through list of boundary regions to find matching ID.
        for (const boundary of Boundaries)         {
            if (boundary.id == idl) {
                const lll = L.latLng(boundary.llat, boundary.llon);
                const ull = L.latLng(boundary.ulat, boundary.ulon);
                this.bounds = L.latLngBounds(lll, ull); 
                found = true;
                break;               
            }
        }
        if (!found) {
            console.error(`Parameter '${name} contains an invalid value: ` +
                        `${boundary_id}. It will be ignored.`);
        }
    }    
    // -------------------------------------------------------------------------
    /** Check that a pair of parameters are both defined or both undefined. 
     * 
     * @param {string} name1 - Name of parameter 1.
     * @param {string|undefined} param1 - Value of parameter 1.
     * @param {string} name2 - Name of parameter 2.
     * @param {string|undefined} param2 Value of parameter 3.
     * @returns {boolean} - True if both parameters are defined.
     */
    checkPairParams(name1: string, param1: string|undefined, 
                    name2: string, param2: string|undefined): boolean {

        if (typeof(param1) !== typeof(param2)) {
            console.warn(`Either both or neither of the parameters '${name1}'` +
                            ` and '${name2}' must be supplied`);
        }
        const ok: boolean = (param1 !== undefined) && (param2 !== undefined);
        return ok;
    }

    // -------------------------------------------------------------------------
    /** Generate the NBN API query string representing the interval between two 
     * years.
     * 
     * @param {string} name1 - Name of parameter 1.
     * @param {string|undefined} year1 - Value of the earliest year.
     * @param {string} name2 - Name of parameter 2.
     * @param {string|undefined} year2 - Value of the latest year.
     * @returns {string[]} - Three-element array. Index [0] is the santised 
     * year1; index [1] is the sanitised year2; index [2] is the query string. 
     * All elements are empty strings if one or both years are undefined.
     */
    getDateBand(name1: string, year1: string|undefined, 
                name2: string, year2: string|undefined): string[] {

        const db: string[] = ['', '', ''];

        if (this.checkPairParams(name1, year1, name2, year2)) {
            db[0] = this.sanitiseYear(name1, year1);
            db[1] = this.sanitiseYear(name2, year2);
            if (db[0] !== '' && db[1] !== '') {
                db[2] = `+AND+year:[${db[0]}+TO+${db[1]}]`;
            }
        } 
        return db;          
    }
    // -------------------------------------------------------------------------
    /** Generate the legend entry representing a date band interval.
     * 
     * @param {string} from - Earliest year.
     * @param {string} to - Latest year.
     * @returns {string} - Legend entry.
     */
    getDateBandTitle(from: string, to: string): string {
        const title = `${this.tvk}: ${from}-${to}`;
        return title;
    }
    // -------------------------------------------------------------------------
    /** Transform a gridref to a LatLng object. Uses the centroid of the gridref.
     * 
     * @param {string} gr_str - Grid reference.
     * @returns {L.LatLng|null} - LatLng object else null if invalid gridref.
     */
    getLatLngFromGR(gr_str: string): L.LatLng|null {
        
        let latLng = null;

        try {            
            const nums = bigr.getCentroid(gr_str, 'wg').centroid;
            latLng = L.latLng(nums[1], nums[0]);
        }
        catch (err) {
            console.error(`Invalid grid reference: '${gr_str}'`);
        }
        return latLng;   
    }         
    // -------------------------------------------------------------------------
    /** Transform a Northing,Easting coordinate to a LatLng object.
     * 
     * @param {string} ne_str - Coordinate in format 'Northing,Easting'.
     * @returns {L.LatLng|null} - LatLng object else null if invalid coordinate.
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
            console.error(`Invalid Northing/Easting: '${ne_str}'`);
        }
        return latLng;   
    } 
    // -------------------------------------------------------------------------
    /** Generate a single TileLayer.
     * 
     * @param {string} range - Date range query string as returned by getDateBand.
     * @param {string} fill - Hex string representing colour (e.g. 'FFFF000').
     * @returns {L.TileLayer.WMS} - Generated TileLayer object.
     */
    getWmsLayer(range: string = '', fill: string = Colour.yellow): L.TileLayer.WMS {

        // const wmsType: string = WmsType.point
        // const env = `&ENV=${wmsType};color:${fill};gridres:${this.map_grid_size}`;
        const env = `&ENV=colourmode:osgrid;gridlabels:false;opacity:0.8;` + 
                    `color:${fill};gridres:${this.map_grid_size}`;
        const queryUrl = this.getWmsQueryUrl(range) + env;
        console.debug(queryUrl);
        const tileLayer  = L.tileLayer.wms(queryUrl, {
            layers: 'ALA:occurrences',
            format: 'image/png',
            uppercase: true,
        });	 

        return tileLayer;

        /*
        const queryUrl = this.getWmsQueryUrl(range);
        console.debug(queryUrl);
        const wmsType: string = WmsType.point
        const env = `${wmsType};color:${fill}`;
        const tileLayer  = L.tileLayer.wms(queryUrl, {
            layers: 'ALA:occurrences',
            format: 'image/png',
            uppercase: true,
            // @ts-ignore: WMSOptions does not have these NBN-specific members
            color: fill,
            outline:'true',
            ENV: env
        });	 

        return tileLayer;
        */        
    }
    // -------------------------------------------------------------------------

    getWmsLayers(): {[k: string]: L.TileLayer.WMS} {

        const wmsLayers: {[k: string]: L.TileLayer.WMS} = {};

        const hasDateBands: boolean = (this.rangeurl0.length > 0) ||
                                      (this.rangeurl1.length > 0) ||
                                      (this.rangeurl2.length > 0);
        if (hasDateBands) {
            // Split data into one or more date bands
            if (this.rangeurl0.length > 0) {
                wmsLayers[this.getDateBandTitle(this.b0from, this.b0to)] = 
                    this.getWmsLayer(this.rangeurl0, this.b0fill);
            }
            if (this.rangeurl1.length > 0) {
                wmsLayers[this.getDateBandTitle(this.b1from, this.b1to)] = 
                    this.getWmsLayer(this.rangeurl1, this.b1fill);
            }
            if (this.rangeurl2.length > 0) {
                wmsLayers[this.getDateBandTitle(this.b2from, this.b2to)] = 
                    this.getWmsLayer(this.rangeurl2, this.b2fill);
            }                        
        } else {
            // Show all data in a single layer
            wmsLayers[this.tvk] = this.getWmsLayer();
        }
        return wmsLayers;

    }
    // -------------------------------------------------------------------------

    getWmsQueryUrl(range: string = ''): string {

        const url = `https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*` +
                    `&fq=lsid:${this.tvk}${range}${this.druidurl}`;
        return url;
    }
    // -------------------------------------------------------------------------
    
    sanitiseParam(name: string, param: string|undefined, filter: RegExp): string {
        let clean = '';
        if (param !== undefined) {
            clean = param.replace(filter, '');
            if (clean !== param) {
                console.warn(`Parameter '${name}' contains invalid characters. ` +
                             `Using the value '${clean}' instead`);
            }
        }
        return clean;
    }
    // -------------------------------------------------------------------------
    /** Check whether a supplied parameter matches an entry in a given list of
     * acceptable values.
     * 
     * @param {string} name - Name of parameter.
     * @param {string|undefined} param - Value of parameter.
     * @param {string[]} list - Array of acceptable values.
     * @returns {string} - Matching value or empty string if no match/undefined.
     */
    sanitiseParamList(name: string, param: string|undefined, list: string[]): string {
        
        let rv = '';
        if (param !== undefined) {
            const clean = this.sanitiseParam(name, param, /[^a-zA-Z0-9-]/g)
                              .toLowerCase();
            for (let i=0; i < list.length; i++) {
                if (clean === list[i]) {
                    rv = list[i];
                    break;
                }   
            }
            if (rv === '') {
                console.warn(`Parameter '${name}' has the unrecognised value ` +
                    `of '${clean}'. Acceptable values are: ${list.join(', ')}`);
            }
        }
        return rv;
    }         
    // -------------------------------------------------------------------------

    sanitiseFill(name: string, param: string|undefined, preset: string): string {
        const p = param || preset;
        let fill = p.toUpperCase().replace(/[^A-F0-9]/g, '');
        try {
            if (fill.length !== 6) {
                throw new Error('Invalid fill format');          
            }
        }
        catch (err) {
            console.error(`Invalid fill format for '${name}': ${p}`);
            fill = preset;
        }  
        return fill;          
    }
    // -------------------------------------------------------------------------

    sanitiseYear(name: string, param: string|undefined): string {

        let p = param || '';
        try {
            const num = Number(p);
            if (num < 1000 || num > 3000) {
                throw new Error('Year out range');          
            }
        }
        catch (err) {
            console.error(`Invalid year for '${name}': ${p}`);
            p = '';
        }  
        return p;            
    }
    // -------------------------------------------------------------------------

    showVCs(): boolean {
        return this.bg === 'vc';
    }
    // -------------------------------------------------------------------------

    skipParam(name: string, param: number|string|undefined): void {
        if (param !== undefined) {
            console.warn(`Parameter '${name}' is not implemented. It will be ` +
                `ignored.`);
        }
    }
    // -------------------------------------------------------------------------
    
}
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
