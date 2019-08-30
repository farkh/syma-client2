import {
    FETCH_USER_SETTINGS_PENDING,
    FETCH_USER_SETTINGS_SUCCESS,
    FETCH_USER_SETTINGS_ERROR,
    
    UPDATE_USER_SETTINGS_PENDING,
    UPDATE_USER_SETTINGS_SUCCESS,
    UPDATE_USER_SETTINGS_ERROR
} from '../types/userSettings.types';

const initialState = {
    isLoading: false,
    userSettings: null,
    error: null,
};

const userSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SETTINGS_PENDING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case FETCH_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userSettings: action.payload,
            };
        case FETCH_USER_SETTINGS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case UPDATE_USER_SETTINGS_PENDING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case UPDATE_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userSettings: action.payload,
            };
        case UPDATE_USER_SETTINGS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        default:
            return { ...state };
    }
};

export default userSettingsReducer;
