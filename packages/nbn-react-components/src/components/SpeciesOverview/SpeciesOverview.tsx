import { Spinner } from '@material-tailwind/react';

import { useDataPartners } from '../../shared/hooks/nbn-atlas-api/useDataPartners';
import { useInfoCards } from '../../shared/hooks/nbn-atlas-api/useInfoCards';
import { useRedListCards } from '../../shared/hooks/nbn-atlas-api/useRedListCards';
import { useSpeciesNames } from '../../shared/hooks/nbn-atlas-api/useSpeciesNames';

import { DatasetsCard, InfoCards, OnlineResourcesCard, 
        RedlistCards } from './overview';
import { SpeciesGallery } from '../SpeciesGallery';
import { SpeciesMap } from '../SpeciesMap';

// Example of Atlas original:
// https://species.nbnatlas.org/species/NHMSYS0000504624#overview

// -----------------------------------------------------------------------------

interface ISpeciesOverview {

    tvk: string;
}
// ------

export default function SpeciesOverview({ tvk }: ISpeciesOverview): React.JSX.Element {

    const names = useSpeciesNames(tvk);
    const sciName: string = names.data?.classification.scientificName || '';
    const info = useInfoCards(tvk);
    const red = useRedListCards(tvk);
    const datasets = useDataPartners(tvk);
    
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <SpeciesGallery tvk={tvk} maxRows={2} />
        <SpeciesMap tvk={tvk} h={'600'} interactive={'1'} logo={'2'} 
                    unconfirmed={'1'} />
        {(datasets.isLoading) ? (<Spinner />) : 
          ((datasets.error) ? (`Error fetching data: ${datasets.error.message}`) : 
            (names.data && datasets.data) ? (
              <DatasetsCard numDatasets={datasets.data.length}
                sciName={sciName} />
            ) : null)
        }
        {(names.isLoading) ? (<Spinner />) : 
          ((names.error) ? (`Error fetching data: ${names.error.message}`) : 
            (names.data) ? (
                <OnlineResourcesCard sciName={sciName} tvk={tvk} />
            ) : null)
        }
        {(red.isLoading) ? (<Spinner />) : 
          ((red.error) ? (`Error fetching data: ${red.error.message}`) : 
            (red.data) ? (
                <RedlistCards data={red.data} />
            ) : null)
        }
        {(info.isLoading) ? (<Spinner />) : 
          ((info.error) ? (`Error fetching data: ${info.error.message}`) : 
            (info.data && info.data.taxonConcept.dataObjects) ? (
                <InfoCards dataObjects={info.data.taxonConcept.dataObjects} />
            ) : null)
        }
      </div>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
