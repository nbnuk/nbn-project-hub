
import type { Meta, StoryObj } from '@storybook/react';
import { default as Map } from './Map';
import { Colour } from './const';

const meta: Meta<typeof Map>= {
    title: 'Map Family/Basic Map',
    component: Map,
    tags: ['autodocs'],

  }
  
export default meta;
type Story = StoryObj<typeof Map>;
  
// Stories
export const ManiolaJurtina: Story = {
    args: {
        species: 'Maniola jurtina',
        year: 2018,
        pointColour: Colour.greenyellow,
    },
};

export const PierisRapae: Story = {
    args: {
        species: 'Pieris rapae',
        year: 2018,
        pointColour: Colour.hotpink
    },
};


