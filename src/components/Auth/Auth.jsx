import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ReCaptcha } from 'react-recaptcha-v3';

import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

import { setCurrentUser } from '../../redux/actions/auth.actions';
import { API_BASE_URI } from '../../constants/uri';
import { setCookie } from '../../services/cookies';
import { setAuthToken } from '../../services/auth';
import routes from '../../constants/routes';
import './auth.scss';

class Auth extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }),
        setCurrentUser: PropTypes.func.isRequired,
    };
    
    state = {
        isLogin: true,
        email: '',
        username: '',
        password: '',
        confirm: '',
        isLoading: false,
        error: null,
        recaptchaToken: '',
    };

    componentDidMount() {
        // if (this.captcha) {
        //     console.log("started, just a second...")
        //     this.captcha.reset();
        //     this.captcha.execute();
        // }
    }

    handleFormSubmit = (e) => {
        if (e) e.preventDefault();
        if (!this.isSubmitAvailable()) return;
        
        const { isLogin } = this.state;

        this.setState({ isLoading: true });

        if (isLogin) {
            this.handleLogin();
        } else {
            this.handleRegister();
        }
    };

    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    toggleAuthType = (e) => {
        if (e) e.preventDefault();
        this.setState(prevState => ({
            isLogin: !prevState.isLogin,
        }));
    };

    handleLogin = () => {
        const { email, password } = this.state;

        axios.post(`${API_BASE_URI}/user/login`, {
            email, password,
        })
            .then((response) => {
                const { token } = response.data;
                const user = jwtDecode(token);
                this.props.setCurrentUser(user);
                setCookie('token', token, { expires: 3600 });
                setAuthToken(token);
                this.props.history.push(routes.HOME);
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.response.data.msg,
                });
            });
    };

    handleRegister = () => {
        const { email, username, password, confirm } = this.state;

        axios.post(`${API_BASE_URI}/user/register`, {
            email, username, password, confirm,
        })
            .then((response) => {
                alert('Sign up successfull');
                this.setState({ isLogin: true });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.response.data.msg,
                });
            });
    };

    isSubmitAvailable = () => {
        const {
            isLogin, email, username, password, confirm, recaptchaToken,
        } = this.state;

        if (isLogin) {
            return email.length > 3 && password.length > 5;
        }

        return email.length > 3 &&
            username.length > 3 &&
            password.length > 5 &&
            password === confirm &&
            recaptchaToken.length > 0;
    };

    onLoadRecaptcha = () => {
        console.log('sadalskdjasl');
        // if (this.captcha) {
        //     console.log("started, just a second...")
        //     this.captcha.reset();
        //     this.captcha.execute();
        // }
    };

    recaptchaCallback = (token, data) => {
        console.log('token, data', token, data);
        this.setState({ recaptchaToken: token });
    };

    render() {
        const {
            isLogin, email, username, password, confirm, isLoading, error,
        } = this.state;
        
        return (
            <div className="auth">
                <ReCaptcha
                    ref={(el) => {this.captcha = el;}}
                    // size="invisible"
                    size="normal"
                    // render="explicit"
                    data-theme="dark"
                    sitekey="6LfCw7QUAAAAAA6CCnbia1BUBTeh1UJS_wJrD0N4"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.recaptchaCallback}
                />
                
                <LoadingOverlay show={isLoading} text="Loading..." />
                
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
                                    <Form.Label htmlFor="confirm">Confirm password</Form.Label>
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
                                disabled={!this.isSubmitAvailable()}
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
};

export default withRouter(connect(null, { setCurrentUser })(Auth));
