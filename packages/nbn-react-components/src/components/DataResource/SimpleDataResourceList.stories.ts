import type {  StoryObj, Meta } from '@storybook/react';

import { SimpleDataResourceList } from './SimpleDataResourceList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data Resource/SimpleDataResourceList',
  component: SimpleDataResourceList,
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
} satisfies Meta<typeof SimpleDataResourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All: Story = {
  args: {
    apiOccurrenceSearchURL: 'https://records-ws.nbnatlas.org/occurrences/search?q=*:*',
    width: "500px"
  },
};
All.storyName = 'All Data Resources';

export const ButterflyConservation: Story = {
  args: {
    apiOccurrenceSearchURL: 'https://records-ws.nbnatlas.org/occurrences/search?q=*:*&fq=data_provider_uid:dp71',
    width: "500px"
  },
};

ButterflyConservation.storyName = 'Butterfly Conservation Trust';


