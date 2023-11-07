
import type { Meta, StoryObj } from '@storybook/react';
import { SpeciesClassBreadcrumb } from './SpeciesClassBreadcrumb';

const meta = {
    title: 'Species Information / Species Classification',
    component: SpeciesClassBreadcrumb,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesClassBreadcrumb>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Breadcrumb: Story = {
    args: {
        tvk: 'NHMSYS0000504624'
    },
};


