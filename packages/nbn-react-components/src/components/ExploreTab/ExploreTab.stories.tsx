import type { Meta, StoryObj } from '@storybook/react';
import { default as ExploreTab } from './ExploreTab';

// -----------------------------------------------------------------------------

const meta = {
    title: 'Area Explorer / Explore Tab',
    component: ExploreTab,
    // tags: ['autodocs'],

  } satisfies Meta<typeof ExploreTab>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------

export const Species: Story = {
    args: {
      isGroup: false,
      name: 'Rana temporaria',
      location: {
        latitude: 50.7719,
        longitude: -2.4351,
        radius: 5
      }        
    },
};

export const Group: Story = {
  args: {
    isGroup: true,
    name: 'Mammals',
    location: {
      latitude: 50.7719,
      longitude: -2.4351,
      radius: 5
    }        
  },
};
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
