// -----------------------------------------------------------------------------
// Internal component HTML element IDs

export const Element = {
    map_id: 'simplemap-map',
    attr1: 'simplemap-attr1',
    attr2: 'simplemap-attr2',
    attr3: 'simplemap-attr3',
    attr4: 'simplemap-attr4',
    pipe3: 'simplemap-pipe3',
};
// -----------------------------------------------------------------------------

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
*/

const PathBase = 'https://simplemap.record-lrc-dev.co.uk/assets/maps';

export const Path = {
    // boundary GeoJSON files
    gj_boundary: `${PathBase}/GB-I-CI-27700-reduced_WGS84.geojson`,
    gj_grid: `${PathBase}/GB-I-grid-27700-reduced_WGS84.geojson`,
    gj_country: `${PathBase}/GB-I-countries-27700-reduced_WGS84.geojson`,
    gj_vc_all: `${PathBase}/GB-I-vcs-27700-reduced_WGS84.geojson`   
};
// -----------------------------------------------------------------------------
// Name of pane used for data layers - used for non-standard z weighting

export const DataPane = 'DataPane';

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
