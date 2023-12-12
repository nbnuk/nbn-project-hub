import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesLiterature } from './SpeciesLiterature';

const meta = {
    title: 'Species Information / Species Literature',
    component: SpeciesLiterature,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesLiterature>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624',        
    },
};
