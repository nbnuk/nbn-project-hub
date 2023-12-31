
import type { Meta, StoryObj } from '@storybook/react';
import SpeciesSearchAndSelect from './SpeciesSearchAndSelect';


const meta: Meta<typeof SpeciesSearchAndSelect>  = {
    title: 'Species / SpeciesSearchAndSelect',
    component: SpeciesSearchAndSelect,
    tags: ['species'],

  };
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
    },
};
 
