
import type { Meta, StoryObj } from '@storybook/react';
import { default as MapLink } from './MapLink';

const meta = {
    title: 'Map Family / Map Link',
    component: MapLink,
    // tags: ['autodocs'],

  } satisfies Meta<typeof MapLink>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const DefaultLink: Story = {
    args: {
        tvk: 'NBNSYS0000027783'
    },
};


