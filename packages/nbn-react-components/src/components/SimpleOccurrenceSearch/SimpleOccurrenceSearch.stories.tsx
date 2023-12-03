import type {  StoryObj, Meta } from '@storybook/react';

import { SimpleOccurrenceSearch } from './SimpleOccurrenceSearch';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SimpleOccurrenceSearch>= {
  title: 'Occurrence/SimpleOccurrenceSearch',
  component: SimpleOccurrenceSearch,
  decorators: [
    (Story) => (
      <div className="w-[800px] mx-auto">
        <p>Tip: search for "otter". Many otter records don't have images, but some do </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'centered',
  },
  
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
 // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
}



export default meta;
type Story = StoryObj<typeof SimpleOccurrenceSearch>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Everything: Story = {
  // args: {
  //   apiOccurrenceSearchURL: 'https://records-ws.nbnatlas.org/occurrences/search?q=taxa:bats',
  //   width: "500px"
  // },
};

export const OnlyRecordsWithImages: Story = {
  args: {
    withImagesOnly: true
  },
};
