import React, { lazy, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';

import Layout from '../Layout/Layout';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

import {
    fetchUserSettingsAction,
    updateUserSettingsAction,
} from '../../redux/requests/userSettingsRequests';

const UserSettingsForm = lazy(() => import('./UserSettingsForm'));

const UserSettings = ({ fetchUserSettings, updateUserSettings, userSettingsState }) => {
    useEffect(() => {
        fetchUserSettings();
    }, []);
    const { isLoading, userSettings, error } = userSettingsState;

    const handleFormSubmit = (userSettings) => {
        updateUserSettings(userSettings);
    };

    if (isLoading) return (
        <Layout contentClassName="user-settings">
            <LoadingOverlay show text="Loading..." />
        </Layout>
    );

    if (error) return (
        <Layout contentClassName="user-settings">
            <Alert variant="danger">
                {error}
            </Alert>
        </Layout>
    );

    return (
        <Layout contentClassName="user-settings">
            <Suspense fallback={<LoadingOverlay show text="Loading..." />}>
                <h1>User settings</h1>

                <UserSettingsForm
                    onSubmitForm={handleFormSubmit}
                    userSettings={userSettings}
                />
            </Suspense>
        </Layout>
    );
};

UserSettings.propTypes = {
    userSettingsState: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        userSettings: PropTypes.object,
        error: PropTypes.string,
    }),
    fetchUserSettings: PropTypes.func.isRequired,
    updateUserSettings: PropTypes.func.isRequired,
};

UserSettings.defaultProps = {
    userSettingsState: {
        isLoading: false,
        userSettings: null,
        error: null,
    },
};

const mapStateToProps = state => ({
    userSettingsState: state.userSettings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserSettings: fetchUserSettingsAction,
    updateUserSettings: updateUserSettingsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
