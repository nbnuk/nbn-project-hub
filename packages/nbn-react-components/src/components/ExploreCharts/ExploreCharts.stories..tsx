import type { Meta, StoryObj } from '@storybook/react';
import { default as ExploreCharts } from './ExploreCharts';

// -----------------------------------------------------------------------------

const meta = {
    title: 'Area Explorer / Explore Charts',
    component: ExploreCharts,
    // tags: ['autodocs'],

  } satisfies Meta<typeof ExploreCharts>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------

export const Default: Story = {
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

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
