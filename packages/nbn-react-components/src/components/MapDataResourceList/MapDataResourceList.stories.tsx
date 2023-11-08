
import type { Meta, StoryObj } from '@storybook/react';
import { default as MapDataResourceList } from './MapDataResourceList';

const meta = {
    title: 'Map Family / Map Data Resource List',
    component: MapDataResourceList,
    // tags: ['autodocs'],

  } satisfies Meta<typeof MapDataResourceList>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const DefaultList: Story = {
    args: {
        tvk: 'NHMSYS0001387317'
    },
};

export const RestrictedList: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        ds: 'dr867,dr855'
    },
};


