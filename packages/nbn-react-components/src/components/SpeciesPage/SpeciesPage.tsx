import Paper from '@mui/material/Paper';

import { SpeciesClassBreadcrumb  } from '../SpeciesClassification';
import { SpeciesTab } from '../SpeciesTab';
import { SpeciesTitle } from '../SpeciesTitle';

// -----------------------------------------------------------------------------

interface ISpeciesPage {

    tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesPage({ tvk }: ISpeciesPage): JSX.Element {

    return (
      <>
        <Paper elevation={0} sx={{m: 5}}>
        <SpeciesClassBreadcrumb tvk={tvk} />
        <SpeciesTitle tvk={tvk} />
        <SpeciesTab tvk={tvk} />
        </Paper>
      </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


