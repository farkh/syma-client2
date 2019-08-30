import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
    loginPending,
    loginError,

    registerPending,
    registerError,

    setCurrentUser,
} from '../actions/auth.actions';
import { API_BASE_URI } from '../../constants/uri';
import { setAuthToken } from '../../services/auth';
import { setCookie } from '../../services/cookies';

export const loginAction = ({ email, password }) => async dispatch => {
    dispatch(loginPending());

    try {
        const { data } = await axios.post(`${API_BASE_URI}/user/login`, { email, password });
        const { token } = data;

        _setAuthUser(token, dispatch);
    } catch (error) {
        const err = error.response ? error.response.data.msg : error.toString();
        dispatch(loginError(err));
    }
};

export const registerAction = ({ email, username, password, confirm }) => async dispatch => {
    dispatch(registerPending());

    try {
        const { data } = await axios.post(`${API_BASE_URI}/user/register`, {
            email, username, password, confirm,
        });
        const { token } = data;
        
        _setAuthUser(token, dispatch);
    } catch (error) {
        const err = error.response ? error.response.data.msg : error.toString();
        dispatch(registerError(err));
    }
};

const _setAuthUser = (token, dispatch) => {
    const user = jwtDecode(token);
    dispatch(setCurrentUser(user));
    setCookie('token', token, { expires: 3600 });
    setAuthToken(token);
};
