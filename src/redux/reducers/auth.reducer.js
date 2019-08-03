import {
    SET_CURRENT_USER,
} from '../types/auth.types';

const initialState = {
    authUser: null,
    isLoading: true,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { authUser: action.authUser, isLoading: false };
        default:
            return state;
    }
};

export default authReducer;
