import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

import { loginAction, registerAction } from '../../redux/requests/authRequests';
import routes from '../../constants/routes';
import './auth.scss';

const LoginForm = lazy(() => import('./LoginForm'));
const RegisterForm = lazy(() => import('./RegisterForm'));

class Auth extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }),
        auth: PropTypes.shape({
            authUser: PropTypes.object,
        }).isRequired,
        login: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
    };
    
    state = {
        isLogin: true,
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.isLogin && nextProps.auth.authUser) this.props.history.push(routes.HOME);
        else if (nextProps.auth.authUser) this.props.history.push(routes.USER_SETTINGS);
    }

    handleFormSubmit = (authData) => {
        const { isLogin } = this.state;

        if (isLogin) {
            const { email, password } = authData;

            this.props.login({ email, password });
        } else {
            const { email, username, password, confirm } = authData;

            this.props.register({ email, username, password, confirm });
        }
    };

    toggleAuthType = (e) => {
        if (e) e.preventDefault();
        this.setState(prevState => ({
            isLogin: !prevState.isLogin,
        }));
    };

    render() {
        const { auth } = this.props;
        const { isLogin } = this.state;
        const { isLoading, error } = auth;
        
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
                        <Suspense fallback={<LoadingOverlay show text="Loading..." />}>
                            {isLogin && (
                                <LoginForm
                                    onFormSubmit={this.handleFormSubmit}
                                    error={error}
                                    toggleAuthType={this.toggleAuthType}
                                />
                            )}
                            {!isLogin && (
                                <RegisterForm
                                    onFormSubmit={this.handleFormSubmit}
                                    error={error}
                                    toggleAuthType={this.toggleAuthType}
                                />
                            )}
                        </Suspense>
                    </Col>
                </Row>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login: loginAction,
    register: registerAction,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
