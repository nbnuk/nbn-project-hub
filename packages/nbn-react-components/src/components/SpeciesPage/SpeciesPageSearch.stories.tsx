import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesPageSearch } from './SpeciesPageSearch';

const meta = {
    title: 'Species Information / Species Page Search',
    component: SpeciesPageSearch,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesPageSearch>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
