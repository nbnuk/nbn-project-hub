import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesRecords } from './SpeciesRecords';

const meta = {
    title: 'Species Information / Species Records',
    component: SpeciesRecords,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesRecords>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
