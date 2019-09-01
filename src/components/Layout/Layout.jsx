import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import './layout.scss';

const Layout = ({ sidebar, children, contentClassName }) => {
    return (
        <Container fluid className="layout">
            <Row>
                <Col
                    sm={sidebar.sidebarCollapsed ? 2 : 4}
                    md={sidebar.sidebarCollapsed ? 2 : 4}
                    lg={sidebar.sidebarCollapsed ? 1 : 2}
                    className="layout__sidebar"
                >
                    <Sidebar />
                </Col>
                <Col
                    xs={12}
                    sm={sidebar.sidebarCollapsed ? 10 : 8}
                    md={sidebar.sidebarCollapsed ? 10 : 8}
                    lg={sidebar.sidebarCollapsed ? 11 : 10}
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

const mapStateToProps = state => ({
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(Layout);
