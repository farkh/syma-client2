import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

import { setCurrentUser } from '../../redux/actions/auth.actions';
import { API_BASE_URI } from '../../constants/uri';
import { setCookie } from '../../services/cookies';
import { setAuthToken } from '../../services/auth';
import './auth.scss';

const initialState = {
    isLogin: true,
    email: '',
    username: '',
    password: '',
    confirm: '',
    isLoading: false,
    error: null,
};

const Auth = (props) => {
    const dispatch = useDispatch();
    const [
        { isLogin, email, username, password, confirm, isLoading, error },
        setState,
    ] = useState(initialState);

    console.log('islogin', isLogin, email, username, password, confirm, isLoading, error);

    const mapState = useCallback((state) => ({
        authState: state.auth,
    }), []);

    const { authState } = useMappedState(mapState);
    const { authUser } = authState;

    useEffect(() => {
        if (authUser) props.history.push('/');
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleAuthType = (e) => {
        e.preventDefault();

        setState(prevState => ({
            ...prevState,
            isLogin: !prevState.isLogin,
            isLoading: false,
            error: null,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
            error: null,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setState(prevState => ({
            ...prevState,
            isLoading: true,
        }));

        if (isLogin) {
            handleLogin();
            return;
        }

        handleSignUp();
    };

    const handleLogin = async () => {
        const requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        _id
                        token
                        email
                        tokenExpiration
                    }
                }
            `,
        };
        
        try {
            const { data } = await axios.post(API_BASE_URI, requestBody);

            if (data.errors) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    error: data.errors[0].message,
                }));
            } else {
                const { _id, token, tokenExpiration } = data.data.login;

                dispatch(setCurrentUser({ _id, token, tokenExpiration, email }));
                setCookie('token', token, { expires: tokenExpiration * 3600 });
                setAuthToken(token);
                props.history.push('/');
            }
        } catch (err) {
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                error: err,
            }));
        }
    };

    const handleSignUp = async () => {
        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {
                        email: "${email}",
                        username: "${username}",
                        password: "${password}",
                        confirm: "${confirm}"
                    }) {
                        _id
                        token
                        email
                        tokenExpiration
                    }
                }
            `,
        };

        try {
            const { data } = await axios.post(API_BASE_URI, requestBody);

            if (data.errors) {
                setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    error: data.errors[0].message,
                }));
            } else {
                const { _id, token, tokenExpiration } = data.data.createUser;

                dispatch(setCurrentUser({ _id, token, tokenExpiration, email }));
                setCookie('token', token, { expires: tokenExpiration * 3600 });
                setAuthToken(token);
                props.history.push('/');
            }
        } catch (err) {
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                error: err,
            }));
        }
    };

    return (
        <div className="auth">
            <LoadingOverlay show={isLoading} text="Loading..." />
            
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 className="auth__title">{isLogin ? 'Log in' : 'Sign up'}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form className="auth__form" onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {!isLogin && (
                            <Form.Group>
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {!isLogin && (
                            <Form.Group>
                                <Form.Label htmlFor="confirm">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirm"
                                    id="confirm"
                                    placeholder="Confirm password"
                                    value={confirm}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        )}

                        <div className="auth__error">{error}</div>

                        <Button
                            variant="primary"
                            className="auth__button"
                            onClick={handleFormSubmit}
                        >
                            {isLogin ? 'Log in' : 'Sign up'}
                        </Button>

                        <div className="auth__bottom">
                            Or <a href="/signup" onClick={toggleAuthType}>
                                {isLogin ? 'sign up' : 'log in'} now.
                            </a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default withRouter(Auth);
