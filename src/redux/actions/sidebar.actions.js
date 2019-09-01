import {
	COLLAPSE_SIDEBAR,
	EXPAND_SIDEBAR,
} from '../types/sidebar.types';

export const collapseSidebar = () => ({
	type: COLLAPSE_SIDEBAR,
});

export const expandSidebar = () => ({
	type: EXPAND_SIDEBAR,
});
