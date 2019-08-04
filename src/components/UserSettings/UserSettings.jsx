import React, { useCallback, useEffect } from 'react';
import { useMappedState } from 'redux-react-hook';
import axios from 'axios';

import Layout from '../Layout/Layout';
import { API_BASE_URI } from '../../constants/uri';

const UserSettings = () => {
    const mapState = useCallback((state) => ({
        authState: state.auth,
    }), []);
    const { authState } = useMappedState(mapState);
    const { authUser } = authState;

    useEffect(() => {
        const fetchUserSettings = async () => {
            const requestBody = {
                query: `
                    query {
                        userSettings(user_id: "${authUser.userId}") {
                            _id
                            total_income
                            total_required_expenses
                            savings_percent
                            day_limit
                            paydate
                            advanced_date
                            curr_balance
                            isSavedThisMonth
                        }
                    }
                `,
            };
    
            try {
                const { data } = await axios.post(API_BASE_URI, requestBody);
    
                if (data.errors) {
                    console.error('ERRORS', data.errors[0].message);
                    // setState(prevState => ({
                    //     ...prevState,
                    //     isLoading: false,
                    //     error: data.errors[0].message,
                    // }));
                } else {
                    console.log('DATA', data);
                    // const { _id, token, tokenExpiration } = data.data.login;
    
                    // dispatch(setCurrentUser({ _id, token, tokenExpiration, email }));
                    // setCookie('token', token, { expires: tokenExpiration * 3600 });
                    // setAuthToken(token);
                    // props.history.push(routes.HOME);
                }
            } catch (err) {
                console.error('err', err);
            }
        };

        fetchUserSettings();
    }, []);
    
    return (
        <Layout contentClassName="user-settings">
            <h1>User settings</h1>

            <form>
                <input type="text" />
                <input type="text" />
                <input type="submit" />
            </form>
        </Layout>
    );
};

export default UserSettings;
