import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import './loading-overlay.scss';

const LoadingOverlay = ({ show, text }) => {
    if (!show) return null;
    
    return (
        <div className="loader">
            <div className="loader__content">
                <Spinner variant="light" animation="grow" />
                <h2 className="loader__title">{text}</h2>
            </div>
        </div>
    );
};

LoadingOverlay.propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string,
};

LoadingOverlay.defaultProps = {
    show: false,
    text: 'Loading...',
};

export default LoadingOverlay;
