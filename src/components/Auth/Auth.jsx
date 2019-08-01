import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import './auth.scss';

class Auth extends Component {
    state = {
        isLogin: true,
        email: '',
        username: '',
        password: '',
        confirm: '',
    };

    toggleAuthType = (e) => {
        e.preventDefault();

        this.setState(prevState => ({
            isLogin: !prevState.isLogin,
        }));
    };
    
    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        console.log('this.state', this.state);
    };
    
    render() {
        const {
            isLogin, email, username, password, confirm,
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

export default Auth;
