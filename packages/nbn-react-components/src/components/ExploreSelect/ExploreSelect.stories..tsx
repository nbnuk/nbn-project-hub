import type { Meta, StoryObj } from '@storybook/react';
import { default as ExploreSelect } from './ExploreSelect';

// -----------------------------------------------------------------------------

const meta = {
    title: 'Area Explorer / Explore Select',
    component: ExploreSelect,
    // tags: ['autodocs'],

  } satisfies Meta<typeof ExploreSelect>;
  
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
