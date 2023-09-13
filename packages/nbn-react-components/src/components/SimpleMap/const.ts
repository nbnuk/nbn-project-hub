
// -----------------------------------------------------------------------------
// https://www.w3schools.com/colors/colors_names.asp
export const Colour = {
    // general colours
    aquamarine: 'F0F8FF',
    blue: '0000FF',
    brown: 'A52A2A',
    coral: 'FF7F50',
    fuschia: 'FF00FF',
    gold: 'FFD700',
    green: '008000',
    greenyellow: 'ADFF2F',
    yellow: 'FFFF00',
    hotpink: 'FF69B4',
    lightblue: 'ADD8E6',
    // specific colours
    seafill: 'E6EFFF',
    boundaryLine: '7C7CD3',
};
// -----------------------------------------------------------------------------
/*
Boundary GeoJSON files converted from BRC-used EPSG:27700 to WGS84 using:
https://mapshaper.org/ (open console: "-proj from=EPSG:27700 crs=EPSG:4326")

WKT files produced using:
1. https://mapshaper.org/ to reduce BRC VC GeoJSON files to 5% detail.
2. https://geojson-to-wkt-converter.onrender.com/ to convert GeoJSON to WKT.
*/

const PathBase = 'https://simplemap.record-lrc-dev.co.uk/assets/maps';

export const Path = {
    // boundary GeoJSON files
    gj_boundary: `${PathBase}/GB-I-CI-27700-reduced_WGS84.geojson`,
    gj_grid: `${PathBase}/GB-I-grid-27700-reduced_WGS84.geojson`,
    gj_country: `${PathBase}/GB-I-countries-27700-reduced_WGS84.geojson`,
    gj_vc_all: `${PathBase}/GB-I-vcs-27700-reduced_WGS84.geojson`,
    // VC GeoJSON files
    gj_vc39: `${PathBase}/vc/100/vc39.geojson`,    
    gj_vc40: `${PathBase}/vc/100/vc40.geojson`,    
    gj_vc58: `${PathBase}/vc/100/vc58.geojson`,    
    // VC WKT files (used for point-in-poly searches)
    wkt_vc39: `${PathBase}/data/wkt/vc39_05.wkt`,    
    wkt_vc40: `${PathBase}/data/wkt/vc40_05.wkt`,    
    wkt_vc58: `${PathBase}/data/wkt/vc58_05.wkt`,    
};
// -----------------------------------------------------------------------------
// Name of pane used for data layers - used for non-standard z weighting

export const DataPane = 'DataPane';

// -----------------------------------------------------------------------------

export const WmsType = {
    legendYear: 'colormode:year,2018,2019,2020,2021,2022,2023;size:4;opacity:0.4',
    point: 'size:4;opacity:0.9',
    singleGrid:  'colourmode:osgrid;gridlabels:true;gridres:singlegrid;opacity:0.4',
    standardGrid:  'colourmode:osgrid;gridlabels:true;gridres:10kgrid;opacity:0.4',
}

/*
TODO: Record density grid: investigate network calls
https://records.nbnatlas.org/occurrences/search?q=*:*&lat=53.2148983&lon=-2.9106426&radius=5&fq=(geospatial_kosher:true%20AND%20-occurrence_status:absent)&nbn_loading=true#tab_mapView
https://records-ws.nbnatlas.org/mapping/wms/reflect?q=*%3A*&fq=(geospatial_kosher%3Atrue%20AND%20-occurrence_status%3Aabsent)&lat=53.214897&lon=-2.9106426&radius=5.0&fq=-occurrence_status:absent&SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=ALA%3Aoccurrences&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&BGCOLOR=0x000000&OUTLINE=false&ENV=colormode%3Agrid%3Bname%3Acircle%3Bsize%3A4%3Bopacity%3A1%3B&GRIDDETAIL=32&STYLE=opacity%3A0.8&SRS=EPSG%3A3857&BBOX=-332653.94709708705,7024868.647520835,-327761.9772868357,7029760.617331087
*/

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
