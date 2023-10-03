import type {  StoryObj, Meta } from '@storybook/react';

import SpeciesAutoComplete from './SpeciesAutoComplete';
import './sac.css';

const meta = {
  title: 'Select Species / Species Auto-Complete',
  component: SpeciesAutoComplete,
  // tags: ['autodocs'],

} satisfies Meta<typeof SpeciesAutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const BlankSearch: Story = {
  args: {
  },
};

export const SeededSearch: Story = {
  args: {
    initialSearchQuery: 'tinca'
  },
};


