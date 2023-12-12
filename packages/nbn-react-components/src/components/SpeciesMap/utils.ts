import { Layer, Map } from 'leaflet';

import { Element } from './const';

// -----------------------------------------------------------------------------
// Swap x & y values in array of arrays of form [[x, y]...]

export function exchangeArrayValues(array: []): [] {
    for (let i = 0; i < array.length; i++) {
        const subArray = array[i];
        const temp = subArray[0];
        subArray[0] = subArray[1];
        subArray[1] = temp;
    }   
    return array;
}

// -----------------------------------------------------------------------------
// Select a base layer which has already been added to a control.

export function selectBaseLayer(map: Map, layer: Layer, name: string): void {
    // display the layer
    layer.addTo(map);
    // find the associated radio button and set its 'checked' property to true
    const radios = document.querySelectorAll(
                    '.leaflet-control-layers-base input[type="radio"]') as 
                    NodeListOf<HTMLInputElement>;
    radios.forEach((radio) => {
        if (radio.nextSibling?.textContent?.trim() === name) {
            radio.checked = true;
            // trigger a change event to update the map accordingly
            radio.dispatchEvent(new Event('change'));
        } else {
            radio.checked = false;
        }
    });
}
// -----------------------------------------------------------------------------
// Select an overlay layer which has already been added to a control.

export function selectOverlayLayer(map: Map, layer: Layer, name: string): void {
    // display the layer
    layer.addTo(map);
    // find the associated checkbox  and set its 'checked' property to true
    const checkboxes = document.querySelectorAll(
                '.leaflet-control-layers-overlays input[type="checkbox"]') as
                NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
        if (checkbox.nextSibling?.textContent?.trim() === name) {
            checkbox.checked = true;
            // trigger a change event to update the map accordingly
            checkbox.dispatchEvent(new Event('change'));
        } 
    });
}

// -----------------------------------------------------------------------------

export function setAttributions(layerName: string): void {
    const attrib1 = document.getElementById(Element.attr1) as HTMLAnchorElement;
    const attrib2 = document.getElementById(Element.attr2) as HTMLAnchorElement;
    const attrib3 = document.getElementById(Element.attr3) as HTMLAnchorElement;
    const attrib4 = document.getElementById(Element.attr4) as HTMLAnchorElement;
    const pipe3 = document.getElementById(Element.pipe3);

    // Check if the elements exists
    if (attrib1 && attrib2 && attrib3 && attrib4 && pipe3) {
        // Set the common attributions
        attrib1.innerText = 'powered by NBN';
        attrib1.href = 'https://docs.nbnatlas.org/nbn-atlas-terms-of-use/';
        attrib2.innerText = 'Leaflet';
        attrib2.href = 'https://leafletjs.com';
        attrib4.innerText = '';
        attrib4.href = '';
        pipe3.style.display = 'none';
        // Set the layer-specific attributions
        switch (layerName.toLowerCase()) {
            case 'simple':
                attrib3.innerText = 'OpenStreetMap';
                attrib3.href = 'https://www.openstreetmap.org/copyright';
                attrib4.innerText = 'CartoDB';
                attrib4.href = 'https://carto.com/attributions';
                pipe3.style.display = '';
                break;
            case 'road':
                attrib3.innerText = 'OpenStreetMap';
                attrib3.href = 'https://www.openstreetmap.org/copyright';
                break;
            case 'terrain':
                attrib3.innerText = 'OpenTopoMap';
                attrib3.href = 'https://opentopomap.org';
                break;
            case 'satellite':
                attrib3.innerText = 'powered by Google';
                attrib3.href = 'https://mapsplatform.google.com/';
                break;
            default:
                console.error(`Unknown base layer name: ${layerName}`);
                break;

        }
    }
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

