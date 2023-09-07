import { useEffect } from 'react';

import { MapManager } from './manager';
import { ISimpleMapProps } from './params';

// -----------------------------------------------------------------------------

export default function SimpleMap(props: ISimpleMapProps) {

    // https://github.com/okonet/react-container-dimensions
    const mapStyles = {
        width: props.w ? `${props.w}px` : '350px',
        height: props.h ? `${props.h}px` : '350px',
    };
    useEffect(() => { 
            const mapManager = new MapManager(props);
            mapManager.show();
        }, 
        [props]
    )
    return (
        <div id={props.elementId} style={mapStyles}></div>
    );
}


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
