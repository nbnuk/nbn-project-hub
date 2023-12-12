
import type { Meta, StoryObj } from '@storybook/react';
import { default as SpeciesBreadcrumb } from './SpeciesBreadcrumb';

const meta = {
    title: 'Species Information / Species Classification',
    component: SpeciesBreadcrumb,
    // tags: ['autodocs'],

  } satisfies Meta<typeof SpeciesBreadcrumb>;
  
export default meta;
type Story = StoryObj<typeof meta>;
  
// Stories
export const Breadcrumb: Story = {
    args: {
        tvk: 'NHMSYS0000504624'
    },
};


