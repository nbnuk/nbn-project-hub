import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesPage } from './SpeciesPage';

const meta = {
    title: 'Species Information / Species Page',
    component: SpeciesPage,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesPage>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
