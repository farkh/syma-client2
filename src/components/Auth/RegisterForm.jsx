import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Form, Button } from 'react-bootstrap';

const RegisterForm = ({ onFormSubmit, toggleAuthType, error }) => {
    const initialState = {
        email: '',
        username: '',
        password: '',
        confirm: '',
    };
    const [state, setState] = useState(initialState);
    const { email, username, password, confirm } = state;
    
    const handleFormSubmit = (e) => {
        if (e) e.preventDefault();

        onFormSubmit(state);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isSubmitAvailable = () => {
        return email.length > 3 && username.length > 3 && password.length > 5 && password === confirm;
    };
    
    return (
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
            <Form.Group>
                <Form.Label htmlFor="confirm">Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={handleInputChange}
                />
            </Form.Group>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <Button
                variant="primary"
                className="auth__button"
                onClick={handleFormSubmit}
                disabled={!isSubmitAvailable()}
            >
                Sign up
            </Button>

            <div className="auth__bottom">
                Or <a href="/login" onClick={toggleAuthType}>
                    log in now.
                </a>
            </div>
        </Form>
    );
};

RegisterForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    toggleAuthType: PropTypes.func.isRequired,
    error: PropTypes.string,
};

RegisterForm.defaultProps = {
    error: null,
};

export default RegisterForm;
