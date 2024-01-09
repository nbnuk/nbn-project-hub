import { useEffect, useState } from 'react';

import { SearchLocation, SearchRadius } from './locate';
import { ICoord } from '../../shared/hooks/useSearchLocation';

import { ILocation } from '../../shared/lib/types';

// -----------------------------------------------------------------------------

interface IExploreLocate {

    region: string
    setLocation?: (location: ILocation) => void;
}
// -----------------------------------------------------------------------------

export default function ExploreLocate(props: IExploreLocate): JSX.Element {

    const { region, setLocation } = props;

    const [coord, setCoord] = useState<ICoord>({latitude: 0, longitude: 0});
    const [radius, setRadius] = useState<number>(5);
    
    useEffect(() => {
        const loc: ILocation = {
            latitude: coord.latitude, 
            longitude: coord.longitude, 
            radius: radius
        };
        if (setLocation) {
            setLocation(loc);
        }
    }, [coord, radius]);

    return (
      <>
        <div className=''>
        <SearchLocation defaultRegion={region} setCoord={setCoord} />
        <div>
          <p>
            Showing records for: Latitude {coord.latitude.toFixed(4)}, 
              Longitude {coord.longitude.toFixed(4)}
          </p>
          <hr />
        </div>
        <SearchRadius setRadius={setRadius} />
        <hr />
      </div>
    </>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


