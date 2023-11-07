import { useMemo } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { z } from 'zod';

// -----------------------------------------------------------------------------
// Define data artefacts associated with API call. Example API call:
// https://species.nbnatlas.org/externalSite/genbank?s=Vanessa+atalanta

const SequenceSchema = z.object({
    description: z.string().nullish(),
    furtherDescription: z.string().nullish(),
    link: z.string().nullish(),
    title: z.string().nullish(),
});

export const GenBankSchema = z.object({
    results: z.array(SequenceSchema),
    resultsUrl: z.string().nullish(),
    total: z.string().nullish(),
});

type TGenBankSchema = z.TypeOf<typeof GenBankSchema>;

// -----------------------------------------------------------------------------

interface IGenbank {
    genBank: TGenBankSchema
}
// -----------------------------------------------------------------------------

export function GenbankCards({ genBank }: IGenbank): JSX.Element {

    // Transform data to an array suitable for rendering
    const seqs = useMemo(()  => genBank.results.map((seq) => {
        return {
            description: seq.description ??= '',
            furtherDescription: seq.furtherDescription ??= '',
            link: seq.link ??= '#',
            title: seq.title ??= 'No title',
        };
    }), [genBank]);
    
    return (
        <>
        {seqs.map((seq, index) => (
            <Card key={index} sx={{mt: 1, backgroundColor: 'LightGray'}}>
                <CardContent>
                    <Typography component='span' variant='body2'>
                    <Link href={seq.link} underline='hover' target='_blank' 
                        rel='noreferrer'>
                        {seq.title}
                    </Link>
                    <Divider sx={{m: 1}} />
                    {seq.description}
                    <br></br>
                    {seq.furtherDescription}
                    </Typography>
                </CardContent>
            </Card>
        ))}
        </>
    );
}
// -----------------------------------------------------------------------------

export function GenbankTitle({ genBank }: IGenbank): JSX.Element {

    const total: string = genBank.total ??= 'Missing';
    const url: string = genBank.resultsUrl ??= '#';
    const text: string = `View all results - ${total}`;

    return (
        <>
        <Typography variant='h4'>Genbank</Typography>
        <Typography>
        <Link sx={{mt: 1, mb: 3}} href={url} underline='hover' 
                target='_blank' rel='noreferrer'>
                    {text}
        </Link>
        </Typography>
        </>
    );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

