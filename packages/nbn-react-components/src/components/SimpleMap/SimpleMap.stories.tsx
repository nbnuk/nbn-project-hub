
import './assets/leaflet.css';

import type { Meta, StoryObj } from '@storybook/react';
import { default as SimpleMap } from './SimpleMap';

const meta = {
    title: 'Map Family / SimpleMap',
    component: SimpleMap,
    // tags: ['autodocs'],

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

export const Zoom_GridRef: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        bl: 'TL512637',
        tr: 'TG392674',        
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

export const Zoom_VC: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0001387317',
        bg: 'vc',
        vc: '39',
    },    
};

export const Zoom_Region: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0001387317',
        zoom: 'outer-heb',
    },    
};

export const DateBands: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0001387317',
        b0from: '1600',
        b0to: '1987',
        b1from: '1988',
        b1to: '1997',
        b2from: '1998',
        b2to: '2025',      
    },    
};

export const VC_Boundaries: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        bg: 'vc',
    },    
};

export const DataSources: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0001387317',
        ds: 'dr867,dr855',
    },    
};

export const GridSize_2km: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0001387317',
        ds: 'dr867,dr855',
        res: '2km',
    },    
};

export const ImageSize: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        h: '600',
    },       
};

export const Interactive: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        interactive: '1'
    },       
};

export const CustomQueryURL: Story = {
    args: {
        elementId: 'map',
        tvk: 'NHMSYS0000344177',
        query: 'https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*&fq=species:%22Maniola%20jurtina%22+AND+year:[2018+TO+2023]&ENV=colormode:year,2018,2019,2020,2021,2022,2023;size:4;opacity:0.4',
        interactive: '1'
    },       
};

export const BaseLayer_Road: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        base: 'road'
    },       
};

export const BaseLayer_OrderChange: Story = {
    args: {
        elementId: 'map',
        tvk: 'NBNSYS0000027783',
        interactive: '1',
        base: 'terrain,simple'
    },       
};