import type { Meta, StoryObj } from '@storybook/react';
import { default as ExploreLocate } from './ExploreLocate';

// -----------------------------------------------------------------------------

const meta = {
    title: 'Area Explorer / Explore Locate',
    component: ExploreLocate,
    // tags: ['autodocs'],

  } satisfies Meta<typeof ExploreLocate>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------

export const Default: Story = {
    args: {
        region: 'Cheshire'
    },
};

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
