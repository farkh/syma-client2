import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

import { setCurrentUser } from '../../redux/actions/auth.actions';
import { deleteCookie } from '../../services/cookies';
import routes from '../../constants/routes';

import './navigation.scss';

const Navigation = (props) => {
    const { authState } = props;
    const { authUser } = authState;

    const logout = e => {
        e.preventDefault();

        props.setCurrentUser(null);
        deleteCookie('token');
        props.history.push('/auth');
    };
    
    return (
        <Navbar variant="light">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        to={routes.TRANSACTIONS}
                        className="navbar__link"
                        activeClassName="navbar__link--active"
                    >
                        Transactions
                    </NavLink>
                </Nav>

                <Nav className="ml-auth">
                    {authUser &&
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="user-dropdown"
                                className="user-dropdown__toggle"
                            >
                                <img
                                    src={authUser.avatar}
                                    className="user-dropdown__avatar"
                                    alt="avatar"
                                />
                                {authUser.username}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href={routes.USER_SETTINGS}>Settings</Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item
                                    href={routes.LOGOUT}
                                    onClick={logout}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    }
                    {!authUser &&
                        <NavLink
                            to="/auth"
                            className="navbar__link"
                            activeClassName="navbar__link--active"
                        >
                            Login
                        </NavLink>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    authState: state.auth,
});

export default withRouter(connect(mapStateToProps, { setCurrentUser })(Navigation));
