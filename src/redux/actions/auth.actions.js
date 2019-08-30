import {
    LOGIN_PENDING,
    LOGIN_ERROR,

    REGISTER_PENDING,
    REGISTER_ERROR,
    
    SET_CURRENT_USER,
} from '../types/auth.types';

export const loginPending = () => ({
    type: LOGIN_PENDING,
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    error,
});

export const registerPending = () => ({
    type: REGISTER_PENDING,
});

export const registerError = (error) => ({
    type: REGISTER_ERROR,
    error,
});

export const setCurrentUser = (authUser) => dispatch => dispatch({
    type: SET_CURRENT_USER,
    authUser,
});
