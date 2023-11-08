import { useEffect, useMemo, useState } from 'react';
import { IMapTitleProps, Params } from './params';

// -----------------------------------------------------------------------------

export default function MapTitle(props: IMapTitleProps): JSX.Element {
   
    const [heading, setHeading] = useState('');

    const params = useMemo(() => new Params(props), [props]);
    useEffect(() => {
        params.fetchHeading()
        .then((data) => setHeading(data))
    }, [params]);
  
    const showTitle: boolean = params.title !== '0';
    const showTerms: boolean = params.terms !== '0';
    const w: number = parseInt(params.w);

    return (
      <div style={{width: w}}>
        { showTitle ? (<h3>{heading}</h3>) : ('') }
        { showTerms ? (<p>The National Biodiversity Network records are shown on 
          the map below. (See <a href="https://docs.nbnatlas.org/nbn-atlas-terms-of-use/" 
            target="_blank">terms and conditions</a>)</p>) : ('') }
      </div>
    );
  }

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
