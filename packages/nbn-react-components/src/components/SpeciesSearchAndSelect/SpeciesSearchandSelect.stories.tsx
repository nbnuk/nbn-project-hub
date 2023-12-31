
import type { Meta, StoryObj } from '@storybook/react';
import SpeciesSearchAndSelect from './SpeciesSearchAndSelect';


const meta: Meta<typeof SpeciesSearchAndSelect>  = {
    title: 'Species / SpeciesSearchAndSelect',
    component: SpeciesSearchAndSelect,
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
 
