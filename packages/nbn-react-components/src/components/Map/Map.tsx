import { useEffect } from 'react';
import { MapManager } from './manager';

// -----------------------------------------------------------------------------

interface MapProps {
    species: string;
    year: number;
    pointColour?: string;
}
// -----------------------------------------------------------------------------
const elementId = 'map';

export default function Map({species, year, pointColour}: MapProps) {

    const mapStyles = {
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
    };
    // this useEffect hook runs when the component is first mounted:    
    useEffect(() => { 
            const mapManager = new MapManager(elementId);
            mapManager.showSpecies(species, year, 
                                    pointColour);
        }, 
        [species, year, pointColour]
    );
    return (
        <div id={elementId} style={mapStyles}></div>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
