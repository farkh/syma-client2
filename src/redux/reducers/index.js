import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import userSettingsReducer from './userSettings.reducer';
import sidebarReducer from './sidebar.reducer';

export default combineReducers({
    auth: authReducer,
    userSettings: userSettingsReducer,
    sidebar: sidebarReducer,
});
