import type {  StoryObj, Meta } from '@storybook/react';
import List2 from './List2';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UI components/Lists/List2',
  component: List2,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }} className="bg-white p-2">
        <Story />
      </div>
    ),
  ],
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
} satisfies Meta<typeof List2>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderItem=(item, index) => <><div><a href="#" className="text-blue-500">{item} link</a></div><div>Records: {index}</div></>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    items: ['Hibernation Survey', 'Southern Scotland Bat Survey, 2016','Butterfly distributions for Scotland from Butterfly Conservation and the Biological Records Centre','Leicestershire and Rutland Environmental Records Centre records 2015-2019','David Dodds Associates Ltd - Species Records'],
    width: "500px",
    renderItem:renderItem
  },
};



