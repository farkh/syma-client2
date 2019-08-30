import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Form, Button } from 'react-bootstrap';

import { validateEmail } from '../../services/validators';

const LoginForm = ({ onFormSubmit, toggleAuthType, error }) => {
    const initialState = {
        email: '',
        password: '',
    };
    const [state, setState] = useState(initialState);
    const { email, password } = state;
    
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
        return validateEmail(email) && password.length > 5;
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
                Log in
            </Button>

            <div className="auth__bottom">
                Or <a href="/signup" onClick={toggleAuthType}>
                    sign up now.
                </a>
            </div>
        </Form>
    );
};

LoginForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    toggleAuthType: PropTypes.func.isRequired,
    error: PropTypes.string,
};

LoginForm.defaultProps = {
    error: null,
};

export default LoginForm;
