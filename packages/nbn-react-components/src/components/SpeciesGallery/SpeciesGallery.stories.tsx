import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesGallery } from './SpeciesGallery';
import './sg.css';

const meta = {
    title: 'Species Information / Species Gallery',
    component: SpeciesGallery,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesGallery>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
        tvk: 'NHMSYS0000504624'
    },
};

export const MaximumRows: Story = {
    args: {
        tvk: 'NHMSYS0000504624',
        maxRows: 1
    },
};
