import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import Layout from '../Layout/Layout';

const Home = () => {
    const mapState = useCallback((state) => ({
        authState: state.auth,
    }), []);
    const { authState } = useMappedState(mapState);
    const { authUser } = authState;

    if (!authUser) return (
        <Layout>
            <h1>No user</h1>
        </Layout>
    );
    
    return (
        <Layout>
            <h1>Logged in!</h1>
        </Layout>
    );
};

export default Home;
