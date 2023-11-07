import { ReactNode, SyntheticEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { SpeciesClassification } from '../SpeciesClassification';
import { SpeciesDataPartners } from '../SpeciesDataPartners';
import { SpeciesGallery } from '../SpeciesGallery';
import { SpeciesLiterature } from '../SpeciesLiterature';
import { SpeciesNames } from '../SpeciesNames';
import { SpeciesOverview } from '../SpeciesOverview';
import { SpeciesSequences } from '../SpeciesSequences';
import { SpeciesRecords } from '../SpeciesRecords';

// Example:
// https://species.nbnatlas.org/species/NHMSYS0000504624#names

// -----------------------------------------------------------------------------

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
// -----------------------------------------------------------------------------

function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// -----------------------------------------------------------------------------

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// -----------------------------------------------------------------------------

interface ISpeciesTab {

  tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesTab({ tvk }: ISpeciesTab): JSX.Element {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyle = {
    textTransform: 'none'
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={tabStyle} value={value} variant='scrollable'
          scrollButtons='auto' onChange={handleChange} aria-label='species explorer'>
          <Tab sx={tabStyle} label='Overview' {...a11yProps(0)} />
          <Tab sx={tabStyle} label='Gallery' {...a11yProps(1)} />
          <Tab sx={tabStyle} label='Names' {...a11yProps(2)} />
          <Tab sx={tabStyle} label='Classification' {...a11yProps(3)} />
          <Tab sx={tabStyle} label='Records' {...a11yProps(4)} />
          <Tab sx={tabStyle} label='Literature' {...a11yProps(5)} />
          <Tab sx={tabStyle} label='Sequences' {...a11yProps(6)} />
          <Tab sx={tabStyle} label='Data Partners' {...a11yProps(7)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SpeciesOverview tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SpeciesGallery tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SpeciesNames tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SpeciesClassification tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <SpeciesRecords tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <SpeciesLiterature tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <SpeciesSequences tvk={tvk} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <SpeciesDataPartners tvk={tvk} />
      </CustomTabPanel>
    </Box>
  );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
