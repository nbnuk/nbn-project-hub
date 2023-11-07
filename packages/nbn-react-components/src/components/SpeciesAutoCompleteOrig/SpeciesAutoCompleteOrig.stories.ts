import type {  StoryObj, Meta } from '@storybook/react';

import { SpeciesAutoCompleteOrig } from './SpeciesAutoCompleteOrig';
import './sac.css';

const meta = {
  title: 'Select Species / Species Auto-Complete',
  component: SpeciesAutoCompleteOrig,
  // tags: ['autodocs'],

} satisfies Meta<typeof SpeciesAutoCompleteOrig>;

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


