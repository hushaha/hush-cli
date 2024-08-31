import { addDynamicIconSelectors } from '@iconify/tailwind';
import typography from '@tailwindcss/typography';

export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
	extend: {}
};
export const plugins = [typography, addDynamicIconSelectors()];
