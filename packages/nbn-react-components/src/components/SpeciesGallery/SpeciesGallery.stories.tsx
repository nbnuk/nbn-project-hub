
import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesGallery } from './SpeciesGallery';
import './sg.css';

const meta = {
    title: 'Species Information / Species Gallery',
    component: SpeciesGallery,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesGallery>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const RedAdmiral: Story = {
    args: {
        tvk: 'NHMSYS0000504624'
    },
};


