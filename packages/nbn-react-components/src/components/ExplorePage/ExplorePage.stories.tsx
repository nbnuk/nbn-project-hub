import type { Meta, StoryObj } from '@storybook/react';
import { default as ExplorePage } from './ExplorePage';

// -----------------------------------------------------------------------------

const meta = {
    title: 'Area Explorer / Explore Page',
    component: ExplorePage,
    // tags: ['autodocs'],

  } satisfies Meta<typeof ExplorePage>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------

export const Default: Story = {
    args: {
        
    },
};

export const FilterFamiles: Story = {
  args: {
      filterFamilies: ['Hesperiidae', 'Lycaenidae', 'Nymphalidae', 'Papilionidae',
          'Pieridae', 'Riodinidae'],
      region: 'Scotland'
  },
};

export const FilterGroups: Story = {
  args: {
    filterGroups: ['Arthropods', 'Crustaceans', 'Insects', 'Myriapods', 
        'SpidersandAllies'],
    region: 'England'      
  },
};

export const FilterGroupAndFamilies: Story = {
  args: {
    filterGroups: ['Insects'],
    filterFamilies: ['Hesperiidae', 'Lycaenidae', 'Nymphalidae', 'Papilionidae',
          'Pieridae', 'Riodinidae'],
    region: 'Cheshire'      
  },
};
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
