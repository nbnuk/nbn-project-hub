import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesTab } from './SpeciesTab';

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
