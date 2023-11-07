import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// -----------------------------------------------------------------------------

export interface IDatasetSchema {
    count: number,
    drUrn: string,
    licence: string,
    link: string,
    name: string,
    partner: string,
  }  
// -----------------------------------------------------------------------------

interface IDataSetTable {
    datasets: IDatasetSchema[];
  }
  // ----------------------
  
export function DatasetTable({datasets}: IDataSetTable): JSX.Element {

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400, maxWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Data sets</TableCell>
              <TableCell align='right'>Records</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasets.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                <Link sx={{ml: 1}} href={row.link} underline='hover' 
                target='_blank' rel='noreferrer'>
                    {row.name}
            </Link>                    
                </TableCell>
                <TableCell align='right'>{row.count.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>    )
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
