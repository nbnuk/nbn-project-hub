import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { z } from 'zod';

// -----------------------------------------------------------------------------

const bhlBaseUrl = 'https://www.biodiversitylibrary.org/';
export const celBaseUrl = 'https://www.conservationevidence.com/';

const getCelSummaryUrl = (sciName: string): string => 
    { return celBaseUrl + `data/index?terms=${sciName}#summaries`; }

// -----------------------------------------------------------------------------
// Define data artefacts for API call. Example API call:
// https://www.conservationevidence.com/binomial/nbnsearch?name=Vanessa+atalanta&action=1&total=8

const CelResultSchema = z.object({
    title: z.string().nullish(),
    url: z.string().nullish(),
});

export const CelSchema = z.object({
    results: z.array(CelResultSchema),
    results_url: z.string().nullish(),
    total_results: z.number(),
    total_results_copy: z.string().nullish(),
});

type TCelSchema = z.TypeOf<typeof CelSchema>;

// -----------------------------------------------------------------------------

interface IBhlCard {
  sciNames: string[];
}
// ----------------------

export function BhlCard({sciNames}: IBhlCard): JSX.Element {

  const searchUrl: string = bhlBaseUrl + 'search?SearchTerm=' 
                            + sciNames.join('+OR+') + '&SearchCat=M#/names';

    return (
      <Grid item xs={12} sm={9}>
        <Card>
          <CardContent>
            <Typography variant='h5'>
              References for this taxon found in the 
              <Link sx={{ml: 1}} href={bhlBaseUrl} underline='hover' 
                target='_blank' rel='noreferrer'>
                    Biodiversity Heritage Library
              </Link>            
            </Typography>            
            <Typography sx={{mt: 1}}>
              <Link href={searchUrl} underline='hover' target='_blank' rel='noreferrer'>
                      Search BHL for references to {sciNames[0]}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
}
// -----------------------------------------------------------------------------

interface ICelCard {
  data: TCelSchema;
  sciName: string;
}
// ----------------------

export function CelCard({sciName, data}: ICelCard): JSX.Element {

    // Get summary string
    const tot: number = data.total_results;
    const plur: string = tot > 1 ? 'are' : 'is';
    const summary: string = 
        `There ${plur} a total of ${tot.toString()} actions and individual studies.`;
    // Map references to an array suitable for rendering
    const refs = data.results.map((res) => {
        return {
            title: res.title ??= 'No title',
            url: res.url ??= '#'
        };
    });

    return (
      <Grid item xs={12} sm={9}>
        <Card>
          <CardContent>
            <Typography variant='h5'>
                References for this taxon found in the 
                <Link sx={{ml: 1}} href={celBaseUrl} underline='hover' 
                    target='_blank' rel='noreferrer'>
                    Conservation Evidence Library
                </Link>            
            </Typography>
            <Typography component='div' sx={{mt: 1}}>
              <List dense={true}>
              {refs.map((ref, index) => (
                <ListItem key={index}>
                <Link href={ref.url} underline='hover' target='_blank' 
                    rel='noreferrer'>
                    {ref.title}
                </Link>  
                </ListItem>
               ))}
              </List>
            </Typography>
            <Typography component='div' sx={{mt: 1}}>
                <Box sx={{ml: 4}}>
                <Link sx={{fontStyle: 'italic'}} href={getCelSummaryUrl(sciName)} 
                    underline='hover' target='_blank' rel='noreferrer'>
                    {summary}
                </Link>  
                </Box>               
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
}
// -----------------------------------------------------------------------------

interface ITitleCard {
    text: string;
  }
  // ----------------------
  
  export function TitleCard({text}: ITitleCard): JSX.Element {
  
      return (
        <Grid item xs={12} sm={3}>
          <Card elevation={0} sx={{backgroundColor: '#f8f8f8'}}>
            <CardContent >
              <Typography sx={{fontWeight:'bold'}}>
              {text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
  }
  
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
