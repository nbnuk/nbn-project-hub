import type {  StoryObj, Meta } from '@storybook/react';

import { default as SpeciesListBuilder } from './SpeciesListBuilder';
import '../SpeciesAutoComplete/sac.css';

const meta = {
  title: 'Select Species / Species List Builder',
  component: SpeciesListBuilder,
  // tags: ['autodocs'],

} satisfies Meta<typeof SpeciesListBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
  },
};

export const Abbreviated: Story = {
  args: {
    abbreviate: true
  },
};

export const Unsorted: Story = {
  args: {
    sort: false
  },
};