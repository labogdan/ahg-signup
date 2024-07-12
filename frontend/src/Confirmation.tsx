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
                    <h4>Next Steps</h4>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ul>
                        <li className="mb-3">Look out for an email from our Treasurer to pay Troop Dues.</li>
                        <li className="mb-3">Need uniforms or handbooks? Order directly through the <a href="https://store.americanheritagegirls.org" target="_blank">AHG store</a>. No group orders this year.</li>
                        <li className="mb-3">Put Monday, August 12th on your calendar for our Welcome/Informational Meeting! Please bring the required (and recommended) hard copy forms to complete your registration process.</li>
                        <li className="mb-3"><strong>Please fill them out on your browser, print, and bring them with you to the Welcome Meeting on Monday, August 12th.</strong></li>
                        <li className="mb-3" style={{marginLeft: '40px'}}><a href="https://styles.trooptrack.com/troop_documents/71595/document/original/Troop_Meeting_Permission_Slip_2024-25.pdf" target="_blank">Troop Meeting Permission Slip</a> (one per family)</li>
                        <li className="mb-3" style={{marginLeft: '40px'}}><a href="https://media.trooptrack.com/troop_documents/69748/document/original/AHG_Health_and_Medical_Form.pdf" target="_blank">AHG Health and Medical Form</a> (one per registered adult and girl)</li>
                        <li className="mb-3" style={{marginLeft: '40px'}}><a href="https://media.trooptrack.com/troop_documents/69745/document/original/Request_for_Administration_of_Medication_Form.pdf" target="_blank">Request for Administration of Medication Form</a>  (one per registered adult and girl)</li>
                        <li className="mb-3" style={{marginLeft: '40px'}}><a href="https://media.trooptrack.com/troop_documents/66961/document/original/AHG_High_Adventure_Activity_Medical_Form_VA9020.pdf" target="_blank">High Adventure Activity Medical Form</a> (recommended: needs a physician's signature - REQUIRED for special activities, no exceptions)</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Confirmation;
