import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesDataPartners } from './SpeciesDataPartners';

const meta = {
    title: 'Species Information / Species Data Partners',
    component: SpeciesDataPartners,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesDataPartners>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
