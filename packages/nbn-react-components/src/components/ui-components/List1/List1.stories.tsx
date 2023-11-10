import type {  StoryObj, Meta } from '@storybook/react';
import List1 from './List1';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof List1> = {
  title: 'UI components/Lists/List1',
  component: List1,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: ['item1', 'item2','item3','item4','item5'],
    width: "500px"
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
 // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
}

export default meta;
type Story = StoryObj<typeof List1>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    items: ['item1', 'item2','item3','item4','item5'],
    width: "500px"
  },
};



