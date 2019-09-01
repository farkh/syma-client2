import {
	COLLAPSE_SIDEBAR,
	EXPAND_SIDEBAR,
} from '../types/sidebar.types';

export const collapseSidebar = () => {
	localStorage.setItem('SidebarCollapsed', true);
	
	return ({
		type: COLLAPSE_SIDEBAR,
	});
};

export const expandSidebar = () => {
	localStorage.setItem('SidebarCollapsed', false);
	
	return ({
		type: EXPAND_SIDEBAR,
	});
};
