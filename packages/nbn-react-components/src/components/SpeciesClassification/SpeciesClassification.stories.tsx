
import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesClassification } from './SpeciesClassification';

const meta = {
    title: 'Species Information / Species Classification',
    component: SpeciesClassification,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesClassification>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const VerticalResponsive: Story = {
    args: {
        tvk: 'NHMSYS0000504624'
    },
};


