import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import './layout.scss';

const Layout = ({ children, contentClassName }) => {
    return (
        <Container fluid className="layout">
            <Row>
                <Col
                    sm={4}
                    md={4}
                    lg={2}
                    className="layout__sidebar"
                >
                    <Sidebar />
                </Col>
                <Col
                    xs={12}
                    sm={8}
                    md={8}
                    lg={10}
                    className={`layout__content ${contentClassName}`}
                >
                    <Row className="layout__navbar">
                        <Col xs sm={12} md={12} lg={12}>
                            <Navigation />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs sm={12} md={12} lg={12}>
                            {children}
                        </Col>
                    </Row>
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
