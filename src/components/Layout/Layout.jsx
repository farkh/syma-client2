import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';
import './layout.scss';

const Layout = ({ children, contentClassName }) => {
    return (
        <Container fluid>
            <Row>
                <Col xs sm="12" md="12" lg="12">
                    <Navigation />
                </Col>
            </Row>
            <Row>
                <Col
                    xs
                    sm="12"
                    md={{ span: 10, offset: 1 }}
                    className={`content ${contentClassName}`}
                >
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

Layout.propTypes = {
    contentClassName: PropTypes.string,
};

Layout.defaultProps = {
    contentClassName: '',
};

export default Layout;
