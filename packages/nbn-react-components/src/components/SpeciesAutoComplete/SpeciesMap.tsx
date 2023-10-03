
import { useState } from 'react';

import MapTitle from '../MapTitle';
import SpeciesAutoComplete, { ISpecies }  from './SpeciesAutoComplete';
import { ISimpleMapProps } from '../SimpleMap/params';
import SimpleMap from '../SimpleMap';

// -----------------------------------------------------------------------------

const tdStyle = {
    verticalAlign: 'top',
    padding: 15
};

// -----------------------------------------------------------------------------

export default function SpeciesMap(props: ISimpleMapProps): JSX.Element {

    const spec: ISpecies = {tvk: props.tvk,
        scientificName: '', commonName: '', rank: ''};
    const [species, setSpecies] = useState(spec);
   
    return (
        <div>
            <table>
                <tr>
                    <td style={tdStyle}>
                        <SpeciesAutoComplete setSpecies={setSpecies} />
                    </td>
                    <td style={tdStyle}>
                        <MapTitle tvk={species.tvk} w={props.w}/>
                        <SimpleMap {...props} tvk={species.tvk} />
                    </td>
                </tr>
            </table>
        </div>
    )
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

