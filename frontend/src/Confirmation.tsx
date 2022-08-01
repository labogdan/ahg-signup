import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from "./Header";

const Confirmation = () => {
    return (
        <Container>
            <Header />
            <p>Uniforms and handbooks are available through the <a href="https://store.americanheritagegirls.org" target="_blank">AHG store</a>. We will not be organizing a troop order this year. Please place your orders directly through AHG.</p>
                <p>IMPORTANT – Please make sure you complete steps 1-3 above as soon as possible. Once you have done so, you will receive additional email instructions for completing steps 4-5, which is paying your Troop Dues (due by Aug 31), and turning in required documents, such as health forms and permission slips, etc (due by Aug 31).</p>
        </Container>
    )
}

export default Confirmation;
