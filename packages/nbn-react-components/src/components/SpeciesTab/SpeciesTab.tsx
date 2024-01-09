import React, { useState } from 'react';

import {
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  TabPanel
} from '@material-tailwind/react';

import { makeTabs, TTabNames } from './tabs';
// Example of Atlas original:
// https://species.nbnatlas.org/species/NHMSYS0000504624#names

// -----------------------------------------------------------------------------

interface ISpeciesTab {

  tvk: string;
  tabNames?: TTabNames;
}
// -----------------------------------------------------------------------------

export default function SpeciesTab({ tvk, tabNames }: ISpeciesTab): React.JSX.Element {
    
  const tabs = makeTabs(tvk, tabNames);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  
  return (
    <>
    <Tabs value={activeTab}>
      <TabsHeader className='overflow-x-auto border-b-2 bg-transparent'
        placeholder=''
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={activeTab === tab.value ? 'font-bold text-blue-800' : ''}
            value={tab.value}
            onClick={() => setActiveTab(tab.value)}
            placeholder=''
          >
            {tab.label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody placeholder=''>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={tab.value}>
            {tab.component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </>
  );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
