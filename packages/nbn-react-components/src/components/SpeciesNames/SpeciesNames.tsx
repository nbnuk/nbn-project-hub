import React from 'react';

import { Spinner } from '@material-tailwind/react';

import { useSpeciesNames } from '../../shared/hooks/nbn-atlas-api/useSpeciesNames';

import { TableAcceptedName, TableCommonNames, TableSynonyms } from './names';

// Example of Atlas original:
// https://species.nbnatlas.org/species/NHMSYS0000504624#names

// -----------------------------------------------------------------------------

interface ISpeciesNames {

    tvk: string;
}
// -----------------------------------------------------------------------------

export default function SpeciesNames({ tvk }: ISpeciesNames): React.JSX.Element {

    const { data, error, isLoading } = useSpeciesNames(tvk);

    return (
      <>
        {(isLoading) ? (<Spinner />) : 
          ((error) ? (`Error fetching data: ${error.message}`) : 
            (data) ? (
                <>
                <div className='text-xl font-bold'>
                  Names and sources
                  </div>
                <br></br>
                <TableAcceptedName {...data.taxonConcept} />
                <br></br>
                <TableSynonyms {...data} />
                <br></br>
                <TableCommonNames {...data} />
                </>
            ) : null)
        }
      </>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
