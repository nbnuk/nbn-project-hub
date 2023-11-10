import type {  StoryObj, Meta } from '@storybook/react';

import OccurrenceList from './OccurrenceList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta : Meta<typeof OccurrenceList>= {
  title: 'Occurrence/OccurrenceList',
  component: OccurrenceList,
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
type Story = StoryObj<typeof OccurrenceList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const iNaturalist: Story = {
  args: {
    occurrenceSearchApiUrl: 'https://records-ws.nbnatlas.org/occurrences/search?q=*:*&fq=multimedia:Image&page=10',
  },
};
iNaturalist.storyName = 'iNaturalist Style';

// export const Secondary: Story = {
//   args: {
//     occurrenceSearchApiUrl: 'https://records-ws.nbnatlas.org/occurrences/search?q=*:*&fq=species:%22Lutra%20lutra%22',
//   },
// };
