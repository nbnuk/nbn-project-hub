
import type { Meta, StoryObj } from '@storybook/react';
import { default as MapTitle } from './MapTitle';

const meta: Meta<typeof MapTitle> = {
    title: 'Map Family / Map Title',
    component: MapTitle,
    // tags: ['autodocs'],

  }
  
export default meta;
type Story = StoryObj<typeof MapTitle>;
  
// Stories
export const DefaultTitle: Story = {
    args: {
        tvk: 'NBNSYS0000027783'
    },
};

export const NoTerms: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        terms: '0'
    },
};

export const CommonName: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        title: 'com',
    },
};

export const ScientificName: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        title: 'sci',
    },
};

export const NoCommonName: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        title: 'com',
    },
};

