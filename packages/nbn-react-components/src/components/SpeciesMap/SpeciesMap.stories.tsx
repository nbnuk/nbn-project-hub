import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesMap } from './SpeciesMap';

const meta = {
    title: 'Map Family / Species Map',
    component: SpeciesMap,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesMap>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Internal_Attributions: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        logo: '2'
    },
};

export const Zoom_GridRef: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        bl: 'TL512637',
        tr: 'TG392674',        
    },
};

export const Zoom_NorthingEasting: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        blCoord: '551248,263773',
        trCoord: '639251,367412',        
    },    
};

export const Zoom_VC: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        bg: 'vc',
        vc: '39',
    },    
};

export const Zoom_Region: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        zoom: 'outer-heb',
    },    
};

export const DateBands: Story = {
    args: {
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
        tvk: 'NBNSYS0000027783',
        bg: 'vc',
    },    
};

export const DataSources: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        ds: 'dr867,dr855',
    },    
};

export const GridSize_2km: Story = {
    args: {
        tvk: 'NHMSYS0001387317',
        ds: 'dr867,dr855',
        res: '2km',
    },    
};

export const ImageSize: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        h: '600',
    },       
};

export const Interactive: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        interactive: '1'
    },       
};

export const CustomQueryURL: Story = {
    args: {
        tvk: 'NHMSYS0000344177',
        query: 'https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*&fq=species:%22Maniola%20jurtina%22+AND+year:[2018+TO+2023]&ENV=colormode:year,2018,2019,2020,2021,2022,2023;size:4;opacity:0.4',
        interactive: '1'
    },       
};

export const BaseLayer_Road: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        base: 'road'
    },       
};

export const BaseLayer_OrderChange: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        interactive: '1',
        base: 'terrain,simple'
    },       
};

export const Unconfirmed: Story = {
    args: {
        tvk: 'NBNSYS0000027783',
        unconfirmed: '1',
        interactive: '1',
    },       
};