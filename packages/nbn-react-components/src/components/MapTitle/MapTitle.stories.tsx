
import type { Meta, StoryObj } from '@storybook/react';
import { default as MapTitle } from './MapTitle';

const meta = {
    title: 'Map Family / Map Title',
    component: MapTitle,
    // tags: ['autodocs'],

  } satisfies Meta<typeof MapTitle>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const DefaultTitle: Story = {
    args: {
        tvk: 'NBNSYS0000027783'
    },
};

export const CommonName_CustomCSS: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        title: 'com',
        css: 'https://www.hbrg.org.uk/CommonItems/nbn.css'
    },
};

export const ScientificName_CustomCSS: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        title: 'sci',
        css: 'https://www.hbrg.org.uk/CommonItems/nbn.css'
    },
};

export const NoCommonName_CustomCSS: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        title: 'com',
        css: 'https://www.hbrg.org.uk/CommonItems/nbn.css'
    },
};

