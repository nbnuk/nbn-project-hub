
import type { Meta, StoryObj } from '@storybook/react';
import SpeciesAutoComplete from './SpeciesAutoComplete';


const meta: Meta<typeof SpeciesAutoComplete>  = {
    title: 'Species / SpeciesAutoComplete',
    component: SpeciesAutoComplete,
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
  
// export const SeededSearch: Story = {
//     args: {
//       initialSearchQuery: 'tinca'
//     },
// };
