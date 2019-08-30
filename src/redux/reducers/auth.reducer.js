import {
    LOGIN_PENDING,
    LOGIN_ERROR,

    REGISTER_PENDING,
    REGISTER_ERROR,
    
    SET_CURRENT_USER,
} from '../types/auth.types';

const initialState = {
    isLoading: false,
    authUser: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case REGISTER_PENDING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case REGISTER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                authUser: action.authUser,
            };
        default:
            return state;
    }
};

export default authReducer;
