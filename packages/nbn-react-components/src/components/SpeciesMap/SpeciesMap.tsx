import { useEffect, useRef } from 'react';

import { Element } from './const';
import { MapManager } from './manager';
import { ISpeciesMap } from './params';

// -----------------------------------------------------------------------------

export default function SpeciesMap(props: ISpeciesMap): React.JSX.Element {

    // Adjust map height dependent upon whether external attributions in use.
    const showExtAttrib: boolean = props.logo === undefined || props.logo !== '2';
    const font_size = showExtAttrib ? 12 : 0;
    const h = props.h ? parseInt(props.h) - font_size * 2: 350 - font_size * 2;
    const mapStyles = {
        width: props.w ? `${props.w}px` : '100%',
        height: `${h}px`
    };
    
    const mapRef = useRef<MapManager | null>(null);
    
    useEffect(() => { 
        if (!mapRef.current) {
            mapRef.current = new MapManager(props);
        }
        mapRef.current.show(props.tvk);
        }, 
        [props]
    ); 

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
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
