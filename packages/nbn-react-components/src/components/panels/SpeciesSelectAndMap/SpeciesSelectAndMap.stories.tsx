
import '../../SimpleMap/assets/leaflet.css';

import type { Meta, StoryObj } from '@storybook/react';
import SpeciesSelectAndMap from './SpeciesSelectAndMap';


const meta: Meta<typeof SpeciesSelectAndMap>  = {
    title: 'Species / SpeciesSelectAndMap',
    component: SpeciesSelectAndMap,
    decorators: [
      (Story) => (
        <div className="w-[500px]" >
          <Story />
        </div>
      ),
    ],
    parameters: {
      layout: 'centered',
    },
    tags: ['species'],

  };
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
    },
};
 
