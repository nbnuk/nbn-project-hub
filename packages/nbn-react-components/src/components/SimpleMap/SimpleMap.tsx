import { useEffect } from 'react';
import { MapManager } from './manager';
import { ISimpleMapProps } from './params';

// -----------------------------------------------------------------------------

export default function SimpleMap(props: ISimpleMapProps) {

    const mapStyles = {
        overflow: 'hidden',
        width: props.w || '100%',
        height: props.h || '100vh',
    };
    useEffect(() => { 
            const mapManager = new MapManager(props);
            mapManager.show();
        }, 
        [props]
    );
    return (
        <div id={props.elementId} style={mapStyles}></div>
    );
}


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
