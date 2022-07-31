import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from "./Header";

const Confirmation = () => {
    return (
        <Container>
            <Header />
            <h1>Thank you - we've received your registration.</h1>
        </Container>
    )
}

export default Confirmation;
