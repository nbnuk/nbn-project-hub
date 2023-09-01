// -----------------------------------------------------------------------------

import * as L from 'leaflet';
import 'leaflet-easyprint';

import { Path } from './const';
import { ISimpleMapProps, Params } from './params';
import { getWmsLayer } from './queries';
import * as utils from './utils';

// -----------------------------------------------------------------------------

export class MapManager {

    private baseMaps: {[k: string]: L.TileLayer};
    private overlayMaps: {[k: string]: L.GeoJSON};
    private wmsLayers: {[k: string]: L.TileLayer.WMS};

    private ctrlLayer: L.Control.Layers | null;
    private map: L.Map;
    private params: Params;

    // -------------------------------------------------------------------------
    
    constructor(props: ISimpleMapProps) {

        this.params = new Params(props);

        this.baseMaps = {};
        this.overlayMaps = {};
        this.wmsLayers = {};

        this.ctrlLayer = null;
        this.initBaseMaps();  // call before map initialisation
        this.map = L.map(this.params.elementId, {
            center: [54.59,-1.45],
            zoom: 6,
            zoomSnap: 0,
            layers: [this.baseMaps['Carto']]
        });          
    }
    // -------------------------------------------------------------------------
    // add 'static' boundary line layers

    addBoundaryOverlays() {
        
        const name = 'VCs';
        if (this.params.showVCs() ) {
            this.ctrlLayer?.addOverlay(this.overlayMaps[name], name);
            utils.selectOverlayLayer(this.map, this.overlayMaps[name], name);
        }
    }
    // -------------------------------------------------------------------------
    
    initBaseMaps(): void {

        this.baseMaps = {};
        this.baseMaps['Carto'] = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 
            { maxZoom: 20,
              attribution: '<a href="https://docs.nbnatlas.org/nbn-atlas-terms-of-use/">powered by NBN</a> | <a href="https://carto.com/attributions">CARTO' });
        this.baseMaps['OpenStreetMap'] = L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
            { maxZoom: 20,
              attribution: '<a href="https://docs.nbnatlas.org/nbn-atlas-terms-of-use/">powered by NBN</a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
        this.baseMaps['OpenTopoMap'] = L.tileLayer(
            'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
            { maxZoom: 20,
              attribution: '<a href="https://docs.nbnatlas.org/nbn-atlas-terms-of-use/">powered by NBN</a> | <a href="https://opentopomap.org">OpenTopoMap</a>' });
        this.baseMaps['Satellite'] = L.tileLayer(
            'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
            { maxZoom: 20, 
              subdomains:['mt0','mt1','mt2','mt3'],
              attribution: '<a href="https://docs.nbnatlas.org/nbn-atlas-terms-of-use/">powered by NBN</a> | <a href="https://mapsplatform.google.com/">powered by Google</a>' });         
    }
        // -------------------------------------------------------------------------
    
        initBoundaries() {
        
            const borderStyle = {
                color: '#7C7CD3',
                weight: 1,
                opacity: 0.6,
                fillOpacity: 0,
            }; 
            const boundaryStyle = {
                color: '#7C7CD3',
                fillColor: "white",
                weight: 1,
                opacity: 1,
                fillOpacity: 1,
            };     
                
            let tlBoundary: L.GeoJSON, 
                tlGrid: L.GeoJSON, 
                tlCountry: L.GeoJSON, 
                tlVc: L.GeoJSON; 
            const pBoundary= fetch(Path.gj_boundary)
                .then(response => response.json()).then(data => {
                    tlBoundary = L.geoJSON(data, {style: boundaryStyle })
                });      
            const pGrid = fetch(Path.gj_grid)
                .then(response => response.json()).then(data => {
                    tlGrid = L.geoJSON(data, {style: borderStyle})
            });
            const pCountry = fetch(Path.gj_country)
                .then(response => response.json()).then(data => {
                    tlCountry = L.geoJSON(data, {style: borderStyle})
            });
            const pVc = fetch(Path.gj_vc_all)
                .then(response => response.json()).then(data => {
                    tlVc = L.geoJSON(data, {style: borderStyle})
            });
            Promise.allSettled([pBoundary, pGrid, pCountry, pVc]).then(() => {
                this.overlayMaps.Boundary = tlBoundary;
                this.overlayMaps.Grid = tlGrid;
                this.overlayMaps.Country = tlCountry;
                this.overlayMaps.VCs = tlVc;
                this.addBoundaryOverlays();
                // this.lgStatic = L.layerGroup([this.tlGrid, this.tlCountry, this.tlVc]);
            })
            .catch(err => {
                console.error(`Unable to load boundaries. ${err}`);
            });              
        }

        
    // -------------------------------------------------------------------------
    
    initMap(): void {
        
        // avoid reinitialisation error
        const container = L.DomUtil.get(this.params.elementId);
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
        // @ts-ignore: easyPrint function added by leaflet-easyprint module
        L.easyPrint({
            title: 'Print map',
            position: 'bottomright',
            sizeModes: ['A4Portrait', 'A4Landscape']
        }).addTo(this.map);                        
    }
    // -------------------------------------------------------------------------
    
    initWmsLayers(): void {
        this.wmsLayers = this.params.getWmsLayers();
        for (const [title, layer] of Object.entries(this.wmsLayers)) {
            this.ctrlLayer?.addOverlay(layer, title);
        }        
        // Select first entry in legend
        const key = Object.keys(this.wmsLayers)[0];
        utils.selectOverlayLayer(this.map, this.wmsLayers[key], key);
    }

    // -------------------------------------------------------------------------

    show(): void {
        this.initMap();
        this.initWmsLayers();
        if (this.params.showVCs()) {
            // Only load boundaries if
            this.initBoundaries();
        }
        if (this.params.bounds !== null ) {
            this.map.fitBounds(this.params.bounds);
        }
    }
    // -------------------------------------------------------------------------

    showSpecies(name: string, year: number, colour: string|null = null): void {

        if (year < 1600 || year > 3000) {
            return;
        }
        this.initMap();
        const layer = getWmsLayer(name, year, colour);
        this.ctrlLayer?.addOverlay(layer, name);
        utils.selectOverlayLayer(this?.map, layer, name);
    }
    // -------------------------------------------------------------------------

}


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

