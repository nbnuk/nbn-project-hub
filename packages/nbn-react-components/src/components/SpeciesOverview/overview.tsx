import { useMemo, useState } from 'react';

import Accordion from "@mui/material/Accordion"; 
import AccordionSummary from "@mui/material/AccordionSummary"; 
import AccordionDetails from "@mui/material/AccordionDetails"; 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { z } from 'zod';

// -----------------------------------------------------------------------------
// Define data artefacts for Atlas API calls: InfoCards. Example API call:
// https://species.nbnatlas.org/externalSite/eol?guid=NHMSYS0000504624&s=Vanessa%20atalanta

const AgentSchema = z.object({
    full_name: z.string().nullish(),
    homepage: z.string().nullish(),
    role: z.string().nullish(),
});

const DataObjectSchema = z.object({
    agents: z.array(AgentSchema),
    description: z.string().nullish(),
    license: z.string().nullish(),
    rightsHolder: z.string().nullish(),
    title: z.string().nullish(),
});

type TDataObjectSchema = z.TypeOf<typeof DataObjectSchema>;

const TaxonConceptSchema = z.object({
    dataObjects: z.array(DataObjectSchema).nullish(),
    scientificName: z.string().nullish(),
});

export const ExternalSchema = z.object({
    taxonConcept: TaxonConceptSchema,
});

// -----------------------------------------------------------------------------
// Define data artefacts for Atlas API calls: RedListCard. Example API call:
// https://lists.nbnatlas.org/ws/species/NHMSYS0000504624?isBIE=true

const ListSchema = z.object({
    listName: z.string().nullish(),
    username: z.string().nullish(),
});

const KvpValueSchema = z.object({
    key: z.string().nullish(),
    value: z.string().nullish(),
});

type TKvpValueSchema = z.TypeOf<typeof KvpValueSchema>;

export const RedListObjectSchema = z.object({
    dataResourceUid: z.string().nullish(),
    guid: z.string().nullish(),
    list: ListSchema,
    kvpValues: z.array(KvpValueSchema),
});

export const RedListSchema = z.array(RedListObjectSchema);

type TRedListSchema = z.TypeOf<typeof RedListSchema>;

// -----------------------------------------------------------------------------
// Strip HTML tags from a string.

const stripHTML = (str: string): string => str.replace( /(<([^>]+)>)/ig, ''); 
 
// -----------------------------------------------------------------------------
// Define card formatting constants for consistency across cards.

const customCardContent = {
    paddingTop: 5,
    paddingBottom: 5,
}

const boxShade = 'linear-gradient(to right bottom,  #F5F5F5, LightGray)';
const maxCardWidth = 600;
const minCardWidth = 275;
const footerFontSize = '12px';
const titleFontSize = '18px';

// -----------------------------------------------------------------------------
// Create a datasets cards.

interface IDatasetsCard {
    numDatasets: number;
    sciName: string;
}
// -----

export function DatasetsCard( { numDatasets, sciName } : IDatasetsCard): JSX.Element {

    return (
        <Grid item xs={12} sm={6}>
        <Card sx={{mt: 1, mb: 3, minWidth: minCardWidth, maxWidth: maxCardWidth}}>
            <CardContent style ={customCardContent} sx={{background: boxShade}}>
                <Typography sx={{fontSize: titleFontSize}}>
                Datasets
                </Typography>
            </CardContent>   
            <CardContent>
                <Typography variant='body2'>
                <b>{numDatasets}</b> datasets have provided data to the NBN Atlas 
                for the species {sciName}.
                </Typography>                
            </CardContent>                         
        </Card>
        </Grid>
    );
}
// -----------------------------------------------------------------------------
// Create multiple info cards for a species.

// ------------
// Transform data objects into a format that can be used in the info cards.
function transformData(dataObjects: TDataObjectSchema[]) {
    
    const data = dataObjects.map((dataObj) => {
        const homePage: string = dataObj.agents[0].homepage ??= '';
        const datum = {
            title: stripHTML(dataObj.title ??= 'Description'),
            description: stripHTML(dataObj.description ??= 'Not supplied'),
            rightsHolder: stripHTML(dataObj.rightsHolder ??= 'Not supplied'),
            providedBy: stripHTML(dataObj.agents[0].full_name ??= 'Not supplied'),
            homepage: homePage,
            hasHomepage: (homePage.length > 0),
        };
        return datum
    });
    return data
}
// ------------

interface IInfoCard {
    dataObjects: TDataObjectSchema[];
}
// ------------

export function InfoCards( { dataObjects } : IInfoCard): JSX.Element {

    const data = useMemo(() =>transformData(dataObjects), [dataObjects]);

    return (
    <>
    {data.map((datum, index) => (
        <Grid key={index} item xs={12} sm={6}>
        <Card sx={{mt: 1, mb: 3, minWidth: minCardWidth, maxWidth: maxCardWidth}}>
            <CardContent style ={customCardContent} sx={{background: boxShade}}>
                <Typography sx={{fontSize: titleFontSize}}>
                {datum.title}
                </Typography>
            </CardContent>
            
            <CardContent>
                <Typography variant='body2'>
                    {datum.description}
                </Typography>                
            </CardContent>
            <CardContent style ={customCardContent} sx={{background: boxShade}}>
                <Typography component='div' sx={{fontSize: footerFontSize}}>
                    Rights holder: {datum.rightsHolder}
                    <br />
                    <Stack direction='row'>
                    <Box sx={{mr: 0.5}}>Provided by:</Box> 
                    {(datum.hasHomepage) ? 
                        (<Link  
                            href={datum.homepage} 
                            underline='hover' 
                            target='_blank' 
                            rel='noreferrer'>{datum.providedBy}</Link>  ) : 
                        (datum.providedBy)
                        }
                    </Stack>
                </Typography>
            </CardContent>  
        </Card>
        </Grid>
    ))}
    </>
    );
}
// -----------------------------------------------------------------------------
// Online resources card.

interface IOnlineResourcesCard {
    sciName: string;
    tvk: string;
}
// -----

export function OnlineResourcesCard( { sciName, tvk } : IOnlineResourcesCard): JSX.Element {

    // Get links to the online resources
    const linkBHL = `https://www.biodiversitylibrary.org/search?searchTerm=${sciName}#/names`;
    const linkGBIF = `https://www.gbif.org/species/search?q=${sciName}`;
    const linkEOL = `https://eol.org/search?utf8=%E2%9C%93&q=${sciName}`;
    const linkJSON = `https://species-ws.nbnatlas.org/species/${tvk}.json`;
    const linkPESI = `https://www.eu-nomen.eu/portal/search.php?search=simp&txt_Search=${sciName}`;

    return (
        <Grid item xs={12} sm={6}>
        <Card sx={{mt: 1, mb: 3, minWidth: minCardWidth, maxWidth: maxCardWidth}}>
            <CardContent style ={customCardContent} sx={{background: boxShade}}>
                <Typography sx={{fontSize: titleFontSize}}>
                Online Resources
                </Typography>
            </CardContent>            
            <CardContent>
                <TableContainer >
                    <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell sx={{border: 0}}>
                                <li><Link href={linkJSON} 
                                    underline='hover' target='_blank' 
                                    rel='noreferrer'>JSON</Link></li>
                                <li><Link href={linkGBIF} 
                                    underline='hover' target='_blank' 
                                    rel='noreferrer'>GBIF</Link></li>
                                <li><Link href={linkEOL} 
                                    underline='hover' target='_blank' 
                                    rel='noreferrer'>Encyclopaedia of Life</Link></li>
                            </TableCell>
                            <TableCell sx={{border: 0}}>
                                <li><Link href={linkBHL} 
                                    underline='hover' target='_blank' 
                                    rel='noreferrer'>JSON</Link></li>
                                <li><Link href={linkPESI} 
                                    underline='hover' target='_blank' 
                                    rel='noreferrer'>PESI</Link></li>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
        </Grid>
    );
}
// -----------------------------------------------------------------------------
// Create an inner table of key/value pairs for a single red list card.

interface IRedlistCard {
    kvps: TKvpValueSchema[];
    listName: string|null|undefined;
}
// -----
function RedlistCard( { kvps, listName } : IRedlistCard): JSX.Element {

    const rows = useMemo(() => kvps.map((kvp) => {
        return {
            key: stripHTML(kvp.key ??= 'Not supplied'),
            value: stripHTML(kvp.value ??= 'Not supplied'),        
        }
    }), [kvps]);

    // Default message if there is no data for inner table rows.
    const text = 'A species list provided by ' + (listName ??= 'UNKNOWN');

    return (
        <Typography component='div' variant='body2'>
        <TableContainer>        
            <Table>
                <TableBody>
                {(rows.length === 0) ? 
                    <TableRow>
                        <TableCell>{text}</TableCell>
                    </TableRow> :
                rows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.key}</TableCell>                            
                        <TableCell>{row.value}</TableCell>
                    </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </TableContainer>
        </Typography>  
    );
}
// -----------------------------------------------------------------------------
// Create multiple red list cards for a species. Example:
// https://lists.nbnatlas.org/ws/species/NHMSYS0000504624?isBIE=true

interface IRedlistCards {
    data: TRedListSchema;
}
// -----

export function RedlistCards( { data } : IRedlistCards): JSX.Element {

    const link = 'https://lists.nbnatlas.org/speciesListItem/list/';

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
      (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
    <>
      {data.map((datum, index) => (
        <Grid key={index} item xs={12} sm={6} 
            sx={{mt: 1, mb: 3, minWidth: minCardWidth, maxWidth: maxCardWidth}}>
            <Accordion expanded={expanded === `panel${index}`} 
                onChange={handleChange(`panel${index}`)} >
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                    sx={{background: boxShade}} >
                    {datum.list.listName}
                </AccordionSummary>
                <AccordionDetails>
                    <RedlistCard kvps={datum.kvpValues} listName={datum.list.listName} />
                    <Box sx={{background: boxShade}}>
                    <Typography component='div' sx={{fontSize: footerFontSize}}>
                        Provided by: {' '}
                    <Link  href={link + datum.dataResourceUid} 
                            underline='hover' 
                            target='_blank' 
                            rel='noreferrer'>{datum.list.listName}</Link>
                    </Typography>        
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Grid>
        ))}
    </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
