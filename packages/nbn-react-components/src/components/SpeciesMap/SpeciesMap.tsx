import { useEffect, useRef } from 'react';

import { MapManager } from './manager';
import { ISpeciesMap } from './params';

// -----------------------------------------------------------------------------

export let Element: CElement;

export default function SpeciesMap(props: ISpeciesMap): React.JSX.Element {

    Element = new CElement(props.map_id);
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
        mapRef.current.show(props.search);
    }, [props]
    ); 

    return (
        <>
        <div id={props.map_id} style={mapStyles} />
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
// Class which generates internal component HTML element IDs.

class CElement {
    
    public map_id: string;
    public attr1: string;
    public attr2: string;
    public attr3: string;
    public attr4: string;
    public pipe3: string;

    constructor(map_id: string) {
        this.map_id = map_id;
        this.attr1 = this.map_id + '-attr1';
        this.attr2 = this.map_id + '-attr2';
        this.attr3 = this.map_id + '-attr3';
        this.attr4 = this.map_id + '-attr4';
        this.pipe3 = this.map_id + '-pipe3';
    }
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
