// -----------------------------------------------------------------------------

import './assets/leaflet.css'; // import ahead of Leaflet module
import * as L from 'leaflet';
import { getWmsLayer } from './queries';
import { selectOverlayLayer } from './utils';

// -----------------------------------------------------------------------------

export class MapManager {

    private baseMaps: {[k: string]: L.TileLayer};
    private ctrlLayer: L.Control.Layers | null;
    private elementId: string;
    private map: L.Map;

    // -------------------------------------------------------------------------
    
    constructor(elementId: string) {

        this.elementId = elementId;
        this.baseMaps = {};
        this.ctrlLayer = null;
        this.initBaseMaps();  // call before map initialisation
        this.map = L.map(this.elementId, {
            center: [54.59,-1.45],
            zoom: 6,
            layers: [this.baseMaps['Carto']]
        });          
    }
    // -------------------------------------------------------------------------
    
    initBaseMaps(): void {

        this.baseMaps = {};
        this.baseMaps['Carto'] = L.tileLayer(
            'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
            // @ts-ignore: TileLayerOptions interface does not have a styleId       
            { styleId: 22677 });
        this.baseMaps['OpenStreetMap'] = L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
            { maxZoom: 19 });
        this.baseMaps['OpenTopoMap'] = L.tileLayer(
            'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
            { maxZoom: 17 });
        this.baseMaps['Satellite'] = L.tileLayer(
            'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
            { maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] });
    }
    // -------------------------------------------------------------------------
    
    initMap(): void {
        
        // avoid reinitialisation error
        const container = L.DomUtil.get(this.elementId);
        if (container != null) {
            // @ts-ignore: HTMLElement does not have a _leaflet_id
            container._leaflet_id = null;
        }        
        if (this.ctrlLayer !== null) {
            this.map.removeControl(this.ctrlLayer);
        }
        this.ctrlLayer = L.control
            .layers(this.baseMaps)
            .addTo(this.map);    
        
        this.ctrlLayer.expand();                    
    }
    // -------------------------------------------------------------------------

    showSpecies(name: string, year: number, colour: string|null = null): void {

        if (year < 1600 || year > 3000) {
            return;
        }
        this.initMap();
        const layer = getWmsLayer(name, year, colour);
        this.ctrlLayer?.addOverlay(layer, name);
        selectOverlayLayer(this?.map, layer, name);
    }
    // -------------------------------------------------------------------------

}


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

