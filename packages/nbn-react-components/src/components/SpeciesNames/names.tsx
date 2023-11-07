
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TSpeciesNameSchema, TTaxonConceptSchema } from '../../lib/nameutils';

// -----------------------------------------------------------------------------

const nameWidth = 500;
const missing = 'Not supplied';

// -----------------------------------------------------------------------------

export function TableAcceptedName({nameAuthority, nameComplete}: TTaxonConceptSchema): JSX.Element {

    const acceptedName: string = nameComplete ??= missing;
    const source: string = nameAuthority ??= missing;

    return (
        <TableContainer component={Paper}>        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: nameWidth}}>Accepted Name</TableCell>
                        <TableCell>Source</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{acceptedName}</TableCell>
                        <TableCell><li>{source}</li></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// -----------------------------------------------------------------------------
// Create the common names table component.

export function TableCommonNames({ commonNames }: TSpeciesNameSchema): JSX.Element {

    const names = commonNames.map((com) => {
        // Get language label
        const langCode: string = (com.language ??= '').toLowerCase();
        let langStr: string;
        if (langCode === 'en') {
            langStr = '';
        } else if (langCode === 'cy') {
            langStr = 'Welsh';
        } else if (langCode === 'gd') {
            langStr = 'Gaelic';        
        } else {
            langStr = langCode;
        }
        return {
            name: com.nameString ??= missing,
            source: com.infoSourceName ??= missing,
            status: com.status ??='',
            language: langStr
        };
    });

    return (
        <TableContainer component={Paper}>        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: nameWidth}}>Common Name</TableCell>
                        <TableCell>Source</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {row.name}
                            {(row.language) ?
                            (<Chip sx={{ml: 1}} label={row.language} size='small'></Chip>) :
                            ('')}
                            <Chip sx={{ml: 1}} label={row.status} size='small'></Chip>
                        </TableCell>                            
                        <TableCell><li>{row.source}</li></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// -----------------------------------------------------------------------------
// Create the synonym table component.

export function TableSynonyms({ synonyms }: TSpeciesNameSchema): JSX.Element {

    const names = synonyms.map((syn) => {
        return {
            synonym: syn.nameComplete ??= missing,
            source: syn.nameAuthority ??= missing,
        };
    });
    return (
        <TableContainer component={Paper}>        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: nameWidth}}>Synonym</TableCell>
                        <TableCell>Source</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {row.synonym}
                            <Chip sx={{ml: 1}} label='synonym' size='small'></Chip>
                        </TableCell>
                        <TableCell><li>{row.source}</li></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

