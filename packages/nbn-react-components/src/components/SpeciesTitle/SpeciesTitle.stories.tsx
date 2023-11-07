import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesTitle } from './SpeciesTitle';

const meta = {
    title: 'Species Information / Species Title',
    component: SpeciesTitle,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesTitle>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
