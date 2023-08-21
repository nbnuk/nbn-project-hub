
import './assets/leaflet.css';

import type { Meta, StoryObj } from '@storybook/react';
import { default as SimpleMap } from './SimpleMap';

const meta = {
    title: 'Map Family / SimpleMap',
    component: SimpleMap,
    tags: ['autodocs'],

  } satisfies Meta<typeof SimpleMap>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const TVK: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',

    },
};

export const Zoom_NorthingEasting: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        blCoord: '551248,263773',
        trCoord: '639251,367412',        
    },    
};

export const Zoom_GridRef: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        bl: 'TL512637',
        tr: 'TG392674',        
    },
};

