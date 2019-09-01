import {
	COLLAPSE_SIDEBAR,
	EXPAND_SIDEBAR,
} from '../types/sidebar.types';

const initialState = {
	sidebarCollapsed: localStorage.getItem('SidebarCollapsed') === 'true',
};

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case COLLAPSE_SIDEBAR:
			return {
				...state,
				sidebarCollapsed: true,
			};
		case EXPAND_SIDEBAR:
			return {
				...state,
				sidebarCollapsed: false,
			};
		default:
			return state;
	}
};

export default sidebarReducer;
