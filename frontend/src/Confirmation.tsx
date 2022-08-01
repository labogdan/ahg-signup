import React from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from "./Header";

const Confirmation = () => {
    return (
        <Container>
            <Header />
            <Row className="mb-3">
                <Col>
                    <h5>Next Steps</h5>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    Look out for an email from our Treasurer, Holly Williams to pay Troop Dues
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    Need uniforms or handbooks? Please make your family order directly through the <a href="https://store.americanheritagegirls.org" target="_blank">AHG store</a>.
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    < a href="https://media.trooptrack.com/troop_documents/66958/document/original/Troop_VA9020_Meeting_Permission_Slip.pdf" target="_blank">Troop Meeting Permission Slip</a> (required, 1 per family)
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    < a href="https://media.trooptrack.com/troop_documents/66959/document/original/AHG_Health_and_Medical_Form_VA9020.pdf" target="_blank">Health and Medical Form</a> (required, 1 per girl/registered adult)
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    < a href="https://media.trooptrack.com/troop_documents/66960/document/original/Request_for_Administration_of_Medication_Form.pdf" target="_blank">Request for Administration of Medication</a>  (required, 1 per girl/registered adult)
                </Col>
            </Row>
        </Container>
    )
}

export default Confirmation;
