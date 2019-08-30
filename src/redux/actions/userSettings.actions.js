import {
    FETCH_USER_SETTINGS_PENDING,
    FETCH_USER_SETTINGS_SUCCESS,
    FETCH_USER_SETTINGS_ERROR,

    UPDATE_USER_SETTINGS_PENDING,
    UPDATE_USER_SETTINGS_SUCCESS,
    UPDATE_USER_SETTINGS_ERROR,
} from '../types/userSettings.types';

export const fetchUserSettingsPending = () => ({
    type: FETCH_USER_SETTINGS_PENDING,
});

export const fetchUserSettingsSuccess = (userSettings) => ({
    type: FETCH_USER_SETTINGS_SUCCESS,
    payload: userSettings,
});

export const fetchUserSettingsError = (error) => ({
    type: FETCH_USER_SETTINGS_ERROR,
    error,
});

export const updateUserSettingsPending = () => ({
    type: UPDATE_USER_SETTINGS_PENDING,
});

export const updateUserSettingsSuccess = (userSettings) => ({
    type: UPDATE_USER_SETTINGS_SUCCESS,
    payload: userSettings,
});

export const updateUserSettingsError = (error) => ({
    type: UPDATE_USER_SETTINGS_ERROR,
    error,
});
