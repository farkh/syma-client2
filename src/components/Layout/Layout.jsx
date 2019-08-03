import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ children, contentClassName }) => {
    return (
        <Container fluid>
            <Row>
                <Col xs sm="12" md="12" lg="12">
                    Navbar here
                </Col>
            </Row>
            <Row>
                <Col
                    xs
                    sm="12"
                    md={{ span: 10, offset: 3 }}
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

Layout.propTypes = {
    contentClassName: '',
};

export default Layout;
