import React, { useMemo, useState } from 'react';

import {
    Tab,
    Tabs,
    TabsBody,
    TabsHeader,
    TabPanel
  } from '@material-tailwind/react';

import { makeTabs } from './tabs';
import { IExploreSelect  } from '../ExploreSelect/select';

// -----------------------------------------------------------------------------

export default function ExploreTab(props: IExploreSelect): React.JSX.Element {

    const { isGroup, name } = props;
    const tabs = useMemo(() => makeTabs(props), [props]);
  
    const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

    return (
      <>
        <div className='font-bold text-lg pt-4'>
           {isGroup ? 'Group: ' : 'Species: '} {name}
        </div>
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
