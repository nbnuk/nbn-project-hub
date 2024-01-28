import { useState } from 'react';
import SpeciesSearchAndSelect from  '../../SpeciesSearchAndSelect'
import SimpleMap from  '../../SimpleMap'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';



const SpeciesSelectAndMap = ( )=>{ 

    const [species, setSpecies] = useState<{displayName:string, guid: string}|null>()

    const handleChange = (species:{displayName:string, guid: string}|null ) => {
        setSpecies(species)        
    };

  
    return (<>

<Grid container spacing={0.5}>
  <Grid xs={6} md={8}>
  {species && <SimpleMap tvk={species?.guid} blCoord="001238,585406"  trCoord="456009,989672" w="750" h="500" 
         interactive="1"
         query={`https://records-ws.nbnatlas.org/ogc/wms/reflect?q=lsid:${species.guid}&fq=cl188%3A%22North+East+Scotland+Biological+Records+Centre%22&ENV=colormode:year,2018,2019,2020,2021,2022,2023;size:1;opacity:0.4`}        
        />}
  </Grid>
  <Grid xs={6} md={4}>
  <SpeciesSearchAndSelect onChange={handleChange} />
  </Grid>
 
</Grid>

        {/* <SpeciesSearchAndSelect onChange={handleChange} />
        <br />
        
        {species && <SimpleMap tvk={species?.guid} blCoord="001238,585406"  trCoord="456009,989672" w="600" h="500" 
         interactive="1"
         query={`https://records-ws.nbnatlas.org/ogc/wms/reflect?q=lsid:${species.guid}&fq=cl188%3A%22North+East+Scotland+Biological+Records+Centre%22&ENV=colormode:year,2018,2019,2020,2021,2022,2023;size:1;opacity:0.4`}        
        />} */}
        </>
    );
};

export default SpeciesSelectAndMap;



