
import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesAutoComplete } from './SpeciesAutoComplete';


const meta = {
    title: 'Species Information / Species Auto-Complete',
    component: SpeciesAutoComplete,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesAutoComplete>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
    },
};
  
export const SeededSearch: Story = {
    args: {
      initialSearchQuery: 'tinca'
    },
};
