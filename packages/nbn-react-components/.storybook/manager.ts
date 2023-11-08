import { addons } from '@storybook/manager-api';
import nbnAtlasTheme from './nbn-atlas-theme';

addons.setConfig({
  theme: nbnAtlasTheme,
});