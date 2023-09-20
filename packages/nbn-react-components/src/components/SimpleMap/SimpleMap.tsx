import { useEffect } from 'react';

import { Element } from './const';
import { MapManager } from './manager';
import { ISimpleMapProps } from './params';

// -----------------------------------------------------------------------------

export default function SimpleMap(props: ISimpleMapProps) {

    console.log(props);
    // Adjust map height dependent upon whether external attributions in use
    const showExtAttrib: boolean = props.logo === undefined || props.logo !== '2';
    const font_size = showExtAttrib ? 12 : 0;
    const h = props.h ? parseInt(props.h) - font_size * 2: 350 - font_size * 2;
    const mapStyles = {
        width: props.w ? `${props.w}px` : '350px',
        height: `${h}px`
    };
    console.log(mapStyles);
    useEffect(() => { 
            const mapManager = new MapManager(props);
            mapManager.show();
        }, 
        [props]
    )

    return (
        <>
        <div id={Element.map_id} style={mapStyles}></div> 
        { showExtAttrib ? 
        (<div style={{fontFamily: 'sans-serif', 
                     fontSize: font_size, 
                     width: mapStyles.width}}>
            <a id={Element.attr1} href=''></a>
                <span> | </span>
            <a id={Element.attr2} href=''></a>
                <span> | </span>
            <a id={Element.attr3} href=''></a>
                <span id={Element.pipe3}> | </span>
            <a id={Element.attr4} href=''></a>
            <br />
        </div>) : ('') }
        </>
    );

    /*
        return (
        <div>
        <div id={props.elementId} style={mapStyles}></div>   
        </div> 
    );
    */

}


// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
