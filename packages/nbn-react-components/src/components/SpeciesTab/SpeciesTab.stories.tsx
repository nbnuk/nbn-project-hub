import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesTab } from './SpeciesTab';

const meta = {
    title: 'Species Information / Species Tab',
    component: SpeciesTab,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesTab>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};

export const TabsSubset: Story = {
    args: {
        tvk: 'NHMSYS0000504624',
        tabNames: ['overview', 'gallery', 'names', 'classification']
    },
};

export const TabsReordered: Story = {
    args: {
        tvk: 'NHMSYS0000504624',
        tabNames: ['literature', 'data', 'overview', 'names', 
                'classification', 'gallery', 'records', 'sequences']
    },
};

