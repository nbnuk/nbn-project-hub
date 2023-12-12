import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesNames } from './SpeciesNames';

const meta = {
    title: 'Species Information / Species Names',
    component: SpeciesNames,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesNames>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
