
import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesGallerySearch } from './SpeciesGallerySearch';
import './sgs.css';

const meta = {
    title: 'Species Information / Species Gallery Search',
    component: SpeciesGallerySearch,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesGallerySearch>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
    },
};


