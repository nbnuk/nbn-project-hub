import { useState } from 'react';

import Paper from '@mui/material/Paper';

import { SpeciesAutoComplete, ISpecies }  from '../SpeciesAutoComplete';
import { SpeciesPage } from './SpeciesPage';

// -----------------------------------------------------------------------------

export function SpeciesPageSearch(): JSX.Element {

    const spec: ISpecies = {tvk: '', scientificName: '', commonName: '', rank: ''};
    const [species, setSpecies] = useState(spec);
   
    return (
        <>
        <Paper elevation={0} sx={{m: 5}}>
        <SpeciesAutoComplete setSpecies={setSpecies} />
        {(species.tvk.length > 0) ?
            <SpeciesPage tvk={species.tvk}/> : null}
        </Paper>
        </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

