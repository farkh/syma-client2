import { setCurrentUser } from '../actions/auth.actions';
import { deleteCookie } from '../../services/cookies';

export const catchUnauthorized = ({ dispatch }) => next => action => {
	if (action.error && action.error.status === 401) {
		dispatch(setCurrentUser(null));
		deleteCookie('token');
		window.location = '/auth';
	}

	next(action);
};
