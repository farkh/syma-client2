import React from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout/Layout';

const Home = (props) => {
    const { authState } = props;
    const { authUser } = authState;

    if (!authUser) return (
        <Layout>
            <h1>No user</h1>
        </Layout>
    );
    
    return (
        <Layout contentClassName="dashboard">
            <h1>Logged in!</h1>
        </Layout>
    );
};

const mapStateToProps = state => ({
    authState: state.auth,
});

export default connect(mapStateToProps)(Home);
