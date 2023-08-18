import * as React from 'react';
import { MapManager } from './manager';

// -----------------------------------------------------------------------------

interface MapProps {
    species: string;
    year: number;
    pointColour?: string;
}
// -----------------------------------------------------------------------------
const elementId = 'map';

export default function Map(props: MapProps) {

    const mapStyles = {
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
    };
    // this useEffect hook runs when the component is first mounted:    
    React.useEffect(() => { 
            const mapManager = new MapManager(elementId);
            mapManager.showSpecies(props.species, props.year, 
                                    props.pointColour);
        }, 
        [props.species, props.year, props.pointColour]
    );
    return (
        <React.Fragment>
            <div id={elementId} style={mapStyles}></div>
        </React.Fragment>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
