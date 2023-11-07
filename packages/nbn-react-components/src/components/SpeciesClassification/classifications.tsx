import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import useMediaQuery from '@mui/material/useMediaQuery';

import { ITaxon } from '../../lib/nameutils';

// -----------------------------------------------------------------------------

interface ITaxonListProps {
    taxons: ITaxon[]
}
// -----------------------------------------------------------------------------
// Horizontal breadcrumb-style taxon list.

export function TaxonBreadcrumb ({ taxons }: ITaxonListProps): JSX.Element  {
    
    const taxonStyle = {
        fontSize: '12px',
    };

    const breadcrumbStyle = {
        backgroundColor: '#f5f5f5',
        padding: '4px'
    };

    return (
        <Breadcrumbs maxItems={50} style={breadcrumbStyle}>
        {taxons.map((taxon, index) => (
            <Typography key={index} style={taxonStyle}>
            <Link href={taxon.url} underline='hover' target='_blank' rel='noreferrer'>
                {taxon.value}
            </Link>
            </Typography>
        ))}
        </Breadcrumbs>
    );
}
// -----------------------------------------------------------------------------
// Vertical taxon list with responsive identation.

export function TaxonList ({ taxons }: ITaxonListProps): JSX.Element  {
    
    const indent = useMediaQuery('(min-width:600px)') ? 1 : 0;
    return (
        <>
        {taxons.map((taxon, index) => (
          <Typography component='div' key={index} sx={{ml: indent*(index*2+3)}}>
            <Stack direction='row'>
            <Box sx={{fontWeight: 'bold'}}>{taxon.label}</Box>
            <Box sx={{ml: 1}}>
                <Link href={taxon.url} underline='hover' target='_blank' rel='noreferrer'>
                    {taxon.value}
                </Link>
            </Box>
            </Stack>
          </Typography>
        ))}
        </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
