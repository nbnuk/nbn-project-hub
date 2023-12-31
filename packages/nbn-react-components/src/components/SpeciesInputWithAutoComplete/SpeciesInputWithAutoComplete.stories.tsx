
import type { Meta, StoryObj } from '@storybook/react';
import SpeciesInputWithAutoComplete from './SpeciesInputWithAutoComplete';


const meta: Meta<typeof SpeciesInputWithAutoComplete>  = {
    title: 'Species / SpeciesInputWithAutoComplete',
    component: SpeciesInputWithAutoComplete,
    tags: ['species'],

  };
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Default: Story = {
    args: {
    },
};
  
// export const SeededSearch: Story = {
//     args: {
//       initialSearchQuery: 'tinca'
//     },
// };
