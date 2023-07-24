import { renderMap } from './LeafletMap';

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction
export default {
  title: 'Leaflet Map',
  // tags: ['autodocs'],
  render: ( args ) => {
   
    return renderMap({ ...args });
  },
  argTypes: {
    apiUrl: { control: 'text' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Moths = {
  args: {
    apiUrl: 'Moths',
  },
};

export const Butterflies = {
  args: {
    apiUrl: 'Butterflies',
  },
};
