import { useEffect, useMemo, useState } from 'react';
import { IMapTitleProps, Params } from './params';


// -----------------------------------------------------------------------------

export default function MapTitle(props: IMapTitleProps) {
   
    const [heading, setHeading] = useState('');

    const params = useMemo(() => new Params(props), [props]);
    useEffect(() => {
        params.fetchHeading()
        .then((data) => setHeading(data))
    }, [params]);
  
    if (params.title === '0') {
      return (<div></div>);
    }

    return (
        <div>
          <link type="text/css" rel="stylesheet" href={params.css}></link>        
          <h3>{heading}</h3>
        </div>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
