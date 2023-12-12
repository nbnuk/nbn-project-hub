import React from 'react';

import { SpeciesBreadcrumb  } from '../SpeciesClassification';
import { SpeciesTab } from '../SpeciesTab';
import { SpeciesTitle } from '../SpeciesTitle';

// -----------------------------------------------------------------------------

interface ISpeciesPage {

    tvk: string;
}
// -----------------------------------------------------------------------------

export default function SpeciesPage({ tvk }: ISpeciesPage): React.JSX.Element {

    return (
      <>
        <SpeciesBreadcrumb tvk={tvk} />
        <SpeciesTitle tvk={tvk} />
        <SpeciesTab tvk={tvk} />
      </>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
