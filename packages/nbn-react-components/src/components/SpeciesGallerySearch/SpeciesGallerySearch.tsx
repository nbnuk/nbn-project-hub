
import { useState } from 'react';

import { SpeciesAutoComplete, ISpecies }  from '../SpeciesAutoComplete';
import { SpeciesGallery } from '../SpeciesGallery';

import './sgs.css';

// -----------------------------------------------------------------------------

export function SpeciesGallerySearch(): JSX.Element {

    const spec: ISpecies = {tvk: '', scientificName: '', commonName: '', rank: ''};
    const [species, setSpecies] = useState(spec);
   
    return (
        <div className='sgs_container'>
        <SpeciesAutoComplete setSpecies={setSpecies} />
        <SpeciesGallery tvk={species.tvk} />
        </div>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

