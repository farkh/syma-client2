import React, { useCallback, useEffect, useState } from 'react';
import { useMappedState } from 'redux-react-hook';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import Layout from '../Layout/Layout';
import { API_BASE_URI } from '../../constants/uri';

const initialState = {
    advanced_date: 0,
    curr_balance: 0,
    day_limit: 0,
    isSavedThisMonth: 0,
    paydate: 1,
    savings_percent: 0,
    total_income: 0,
    total_required_expenses: 0,
};

const UserSettings = () => {
    const [
        {
            advanced_date,
            curr_balance,
            day_limit,
            isSavedThisMonth,
            paydate,
            savings_percent,
            total_income,
            total_required_expenses,
        },
        setState,
    ] = useState(initialState);
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
                        userSettings {
                            _id
                            total_income
                            total_required_expenses
                            savings_percent
                            day_limit
                            paydate
                            advance_date
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
                    const { userSettings } = data.data;
                    // const { _id, token, tokenExpiration } = data.data.login;
                    
                    setState(prevState => ({
                        ...prevState,
                        ...userSettings,
                    }));
    
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

    const handleInputChange = e => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const requestBody = {
            query: `
                mutation {
                    updateUserSettings(userSettings: {
                        savings_percent: ${savings_percent},
                        paydate: ${paydate},
                        advance_date: ${advanced_date},
                        curr_balance: ${curr_balance},
                        isSavedThisMonth: ${!!isSavedThisMonth}
                    }) {
                        _id
                        total_income
                        total_required_expenses
                        savings_percent
                        day_limit
                        paydate
                        advance_date
                        curr_balance
                        isSavedThisMonth
                    }
                }
            `,
        };

        try {
            const { data } = await axios.post(API_BASE_URI, requestBody);

            console.log('SAVED DATA', data);
        } catch (err) {
            console.error('err', err);
        }
    };
    
    return (
        <Layout contentClassName="user-settings">
            <h1>User settings</h1>

            <Form className="mb-5" onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="curr_balance">Current Balance:</Form.Label>
                    <Form.Control
                        type="text"
                        name="curr_balance"
                        id="curr_balance"
                        placeholder="0"
                        value={curr_balance}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="advanced_date">Advance Date:</Form.Label>
                    <Form.Control
                        type="text"
                        name="advanced_date"
                        id="advanced_date"
                        placeholder="Date"
                        value={advanced_date}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="paydate">Paydate:</Form.Label>
                    <Form.Control
                        type="text"
                        name="paydate"
                        id="paydate"
                        placeholder="Date"
                        value={paydate}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="savings_percent">Savings percent:</Form.Label>
                    <Form.Control
                        type="text"
                        name="savings_percent"
                        id="savings_percent"
                        placeholder="30%"
                        value={savings_percent}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="total_income">Total income:</Form.Label>
                    <Form.Control
                        type="text"
                        name="total_income"
                        id="total_income"
                        placeholder="0"
                        value={total_income}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="total_required_expenses">Total required expenses:</Form.Label>
                    <Form.Control
                        type="text"
                        name="total_required_expenses"
                        id="total_required_expenses"
                        placeholder="0"
                        value={total_required_expenses}
                        onChange={handleInputChange}
                        disabled
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Saved this month"
                        name="isSavedThisMonth"
                        checked={isSavedThisMonth}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="total_required_expenses">Your day limit:</Form.Label>
                    <Form.Control
                        type="text"
                        name="day_limit"
                        id="day_limit"
                        value={Math.round(day_limit)}
                        onChange={handleInputChange}
                        disabled
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleFormSubmit}>Save</Button>
            </Form>
        </Layout>
    );
};

export default UserSettings;
