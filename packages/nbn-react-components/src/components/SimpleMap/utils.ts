// -----------------------------------------------------------------------------

import * as L from 'leaflet';

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

export function selectBaseLayer(map: L.Map, layer: L.Layer, name: string): void {
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

export function selectOverlayLayer(map: L.Map, layer: L.Layer, name: string): void {
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
// End
// -----------------------------------------------------------------------------

