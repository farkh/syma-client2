import axios from 'axios';

import {
    fetchUserSettingsPending,
    fetchUserSettingsSuccess,
    fetchUserSettingsError,

    updateUserSettingsPending,
    updateUserSettingsSuccess,
    updateUserSettingsError,
} from '../actions/userSettings.actions';
import { API_BASE_URI } from '../../constants/uri';

export const fetchUserSettingsAction = () => async dispatch => {
    dispatch(fetchUserSettingsPending());
    
    try {
        const { data: userSettings } = await axios.get(`${API_BASE_URI}/userSettings`);
        dispatch(fetchUserSettingsSuccess(userSettings));

        return userSettings;
    } catch (error) {
        const err = error.message ? error.message : error.toString();
        dispatch(fetchUserSettingsError(err));
    }
};

export const updateUserSettingsAction = (userSettings) => async dispatch => {
    dispatch(updateUserSettingsPending());

    try {
        const { data: updatedUserSettings } = await axios.patch(`${API_BASE_URI}/userSettings`, userSettings);
        dispatch(updateUserSettingsSuccess(updatedUserSettings));

        return updatedUserSettings;
    } catch (error) {
        const err = error.message ? error.message : error.toString();
        dispatch(updateUserSettingsError(err));
    }
};
