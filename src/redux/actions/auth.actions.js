import {
    SET_CURRENT_USER,
} from '../types/auth.types';

export const setCurrentUser = (authUser) => dispatch => dispatch({
    type: SET_CURRENT_USER,
    authUser,
});
