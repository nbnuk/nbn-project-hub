import type {  StoryObj, Meta } from '@storybook/react';

import { PhotoGrid } from './PhotoGrid';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PhotoGrid> = {
  title: 'Occurrence/PhotoGrid',
  component: PhotoGrid,
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
type Story = StoryObj<typeof PhotoGrid>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const VersionA: Story = {
  args: {
    apiURL: 'https://jsonplaceholder.typicode.com/todos/'
  },
};


