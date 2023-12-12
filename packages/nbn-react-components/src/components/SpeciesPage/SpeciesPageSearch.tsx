import React, { useState } from 'react';

import { SpeciesAutoComplete, ISpecies }  from '../SpeciesAutoComplete';
import { default as SpeciesPage } from './SpeciesPage';

// -----------------------------------------------------------------------------

export default function SpeciesPageSearch(): React.JSX.Element {

    const spec: ISpecies = {tvk: '', scientificName: '', commonName: '', rank: ''};
    const [species, setSpecies] = useState(spec);
   
    return (
        <div className='mx-10'>
        <SpeciesAutoComplete setSpecies={setSpecies} />
        {(species.tvk.length > 0) ?
            <SpeciesPage tvk={species.tvk}/> : null}
        </div>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
