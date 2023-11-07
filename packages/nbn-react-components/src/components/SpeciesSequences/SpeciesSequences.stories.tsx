import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesSequences } from './SpeciesSequences';

const meta = {
    title: 'Species Information / Species Sequences',
    component: SpeciesSequences,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesSequences>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
