import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { setCurrentUser } from '../../redux/actions/auth.actions';
import { API_BASE_URI } from '../../constants/uri';
import { setCookie } from '../../services/cookies';
import './auth.scss';

class Auth extends Component {
    state = {
        isLogin: true,
        email: '',
        username: '',
        password: '',
        confirm: '',
        isLoading: false,
        error: null,
    };
    
    componentDidMount() {
        const { authState } = this.props;

        if (authState.authUser) this.props.history.push('/');
    }

    toggleAuthType = (e) => {
        e.preventDefault();

        this.setState(prevState => ({
            isLogin: !prevState.isLogin,
            isLoading: false,
            error: null,
        }));
    };
    
    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value, error: null });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { isLogin } = this.state;

        this.setState({ isLoading: true });

        if (isLogin) {
            this.handleLogin();
            return;
        }

        this.handleSignUp();
    };

    handleLogin = async () => {
        const { email, password } = this.state;
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
                this.setState({ isLoading: false, error: data.errors[0].message });
            } else {
                const { _id, token, tokenExpiration } = data.data.login;

                this.props.setCurrentUser({ _id, token, tokenExpiration, email });
                setCookie('token', token, { expires: tokenExpiration * 3600 });
                this.props.history.push('/');
            }
        } catch (err) {
            this.setState({ isLoading: false, error: err });
        }
    };

    handleSignUp = async () => {
        const { email, username, password, confirm } = this.state;
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
                this.setState({ isLoading: false, error: data.errors[0].message });
            } else {
                const { _id, token, tokenExpiration } = data.data.createUser;

                this.props.setCurrentUser({ _id, token, tokenExpiration, email });
                setCookie('token', token, { expires: tokenExpiration * 3600 });
                this.props.history.push('/');
            }
        } catch (err) {
            this.setState({ isLoading: false, error: err });
        }
    };
    
    render() {
        const {
            isLogin, email, username, password, confirm, isLoading, error,
        } = this.state;
        
        return (
            <div className="auth">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="auth__title">{isLogin ? 'Log in' : 'Sign up'}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form className="auth__form" onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="email">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={this.handleInputChange}
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
                                        onChange={this.handleInputChange}
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
                                    onChange={this.handleInputChange}
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
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            )}

                            <div className="auth__error">{error}</div>

                            <Button
                                variant="primary"
                                className="auth__button"
                                onClick={this.handleFormSubmit}
                            >
                                {isLogin ? 'Log in' : 'Sign up'}
                            </Button>

                            <div className="auth__bottom">
                                Or <a href="/signup" onClick={this.toggleAuthType}>
                                    {isLogin ? 'sign up' : 'log in'} now.
                                </a>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authState: state.auth,
});

export default withRouter(connect(mapStateToProps, { setCurrentUser })(Auth));
