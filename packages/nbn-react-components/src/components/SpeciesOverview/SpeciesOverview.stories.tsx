import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesOverview } from './SpeciesOverview';

const meta = {
    title: 'Species Information / Species Overview',
    component: SpeciesOverview,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesOverview>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
