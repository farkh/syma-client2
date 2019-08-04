import React, { useCallback } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Navbar, Nav } from 'react-bootstrap';

import { setCurrentUser } from '../../redux/actions/auth.actions';
import { deleteCookie } from '../../services/cookies';

const Navigation = (props) => {
    const dispatch = useDispatch();
    const mapState = useCallback((state) => ({
        authState: state.auth,
    }), []);

    const { authState } = useMappedState(mapState);
    const { authUser } = authState;

    const logout = e => {
        e.preventDefault();

        dispatch(setCurrentUser(null));
        deleteCookie('token');
        props.history.push('/auth');
    };
    
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <NavLink to="/"><Navbar.Brand>SYMA</Navbar.Brand></NavLink>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        to="/transactions"
                        className="navbar__link"
                        activeClassName="navbar__link--active"
                    >
                        Transactions
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className="navbar__link"
                        activeClassName="navbar__link--active"
                    >
                        Settings
                    </NavLink>
                </Nav>

                <Nav className="ml-auth">
                    {authUser &&
                        <NavLink
                            to="/lougout"
                            onClick={logout}
                            className="navbar__link"
                            activeClassName="navbar__link--active"
                        >
                            Logout
                        </NavLink>
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

export default withRouter(Navigation);
