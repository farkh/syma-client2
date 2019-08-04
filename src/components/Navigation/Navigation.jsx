import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
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
            <Navbar.Brand href="/">SYMA</Navbar.Brand>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/transactions">Transactions</Nav.Link>
                </Nav>

                <Nav className="ml-auth">
                    {authUser && <Nav.Link href="/logout" onClick={logout}>Logout</Nav.Link>}
                    {!authUser && <Nav.Link href="/auth">Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default withRouter(Navigation);
