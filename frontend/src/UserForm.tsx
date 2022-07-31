import React, {useEffect, useState} from "react";
import UserService from './users'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from 'react-bootstrap/FloatingLabel';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


import Header from "./Header";
import SuccessModal from "./SuccessModal";
import Total from "./Total";

const UserForm = () => {
    const [girls, setGirls] = useState([
        {
            firstName: '',
            lastName: '',
            age: '',
            grade: ''
        }
    ])
    const [modalShow, setModalShow] = React.useState(false);
    const [totalShow, setTotalShow] = React.useState(false);
    const [validated, setValidated] = useState(false);
    const [krogerParticipateValue, setKrogerParticipateValue] = useState(false);
    const [krogerEnrolledValue, setKrogerEnrolledValue] = useState(false);
    const [volunteerValues, setVolunteerValues] = useState([]);
    const [volunteerOther, setVolunteerOther] = useState("");

    const addFields = () => {
        let newfield = {
            firstName: '',
            lastName: '',
            age: '',
            grade: ''
        }
        setGirls([...girls, newfield])
    }

    const removeFields = () => {
        let data = [...girls];
        data.splice(girls.length - 1, 1)
        setGirls(data)
    }

    const handleFormChange = (index: any, event: any) => {
        let data = [...girls];
        // @ts-ignore
        data[index][event.target.name] = event.target.value;
        setGirls(data);
    }

    const handleKrogerParticipateChange = (event: any) => {
        if (event.target.value === 'yes') {
            setKrogerParticipateValue(true)
        } else {
            setKrogerParticipateValue(false)
        }
    }

    const handleKrogerEnrolledChange = (event: any) => {
        if (event.target.value === 'yes') {
            setKrogerEnrolledValue(true)
        } else {
            setKrogerEnrolledValue(false)
        }
    }

    useEffect(() => {
        console.log(volunteerValues);
        console.log(volunteerOther);
    }, [volunteerValues])

    const handleVolunteerChange = (event: any) => {
        if (event.target.checked === true) {
            setVolunteerValues(volunteerValues => volunteerValues.concat(event.target.value))
        } else {
            setVolunteerValues(volunteerValues.filter(item => item !== event.target.value))

        }
    }

    const handleOtherChange = (event: any) => {
        setVolunteerOther(event.target.value);
    }


    const resetForm = () => {
        setGirls(
            [{
                firstName: '',
                lastName: '',
                age: '',
                grade: ''
            }]
        );
    }

    let handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            girls.map((value, index) => {
                try {
                    UserService.createUser([value.firstName, value.lastName, value.age, value.grade, krogerParticipateValue, krogerEnrolledValue, volunteerValues, volunteerOther])
                        .then( () => {
                            setModalShow(true);
                        })
                } catch (e) {
                    console.error(e);
                } finally {
                    console.log('done');
                }

            })
        }

        setValidated(true);

        /*
        let user = JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                grade: grade
            })*/

    }

    useEffect( () => {
        const shouldShow = girls[0].firstName.length > 0 && girls[0].lastName.length > 0;
        if (girls.length > 0 && shouldShow) {
            setTotalShow(true);
        }
    },[girls])

    return <Container style={{maxWidth: '800px'}}>
        <Header />
        <Row>
            <Col>
                <h1>Welcome to the American Heritage Girls VA9020 Signup Portal!</h1>
                <h5>Please fill out the following form to register your girls.</h5>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                { girls.map((girl, index) => {
                    return (
                            <div key={index} style={{marginBottom: '20px'}}>
                                <Row>
                                <Col>
                                <Form.Group className="mb-3" >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="First Name"
                                        className="mb-3"
                                    >
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={girl.firstName}
                                        onChange={(e) => handleFormChange(index, e)}
                                        required
                                    />
                                        <Form.Control.Feedback type="invalid">
                                            Please fill out first name.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Last  Name"
                                        className="mb-3"
                                    >
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={girl.lastName}
                                        onChange={(e) => handleFormChange(index, e)}
                                        required
                                    />
                                        <Form.Control.Feedback type="invalid">
                                            Please fill out last name.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                </Col>
                                </Row>
                                <Row>
                                <Col>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Age"
                                        className="mb-3"
                                    >
                                    <Form.Control
                                        type="text"
                                        name="age"
                                        placeholder="Age"
                                        value={girl.age}
                                        onChange={(e) => handleFormChange(index, e)}
                                        required
                                    />
                                        <Form.Control.Feedback type="invalid">
                                            Please fill out age.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Grade"
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            name="grade"
                                            value={girl.grade}
                                            onChange={(e) => handleFormChange(index, e)}
                                            required
                                        >
                                            <option value="0">Kindergarten</option>
                                            <option value="1">First</option>
                                            <option value="2">Second</option>
                                            <option value="3">Third</option>
                                            <option value="4">Fourth</option>
                                            <option value="5">Fifth</option>
                                            <option value="6">Sixth</option>
                                            <option value="7">Seventh</option>
                                            <option value="8">Eighth</option>
                                            <option value="9">Ninth</option>
                                            <option value="10">Tenth</option>
                                            <option value="11">Eleventh</option>
                                            <option value="12">Twelfth</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                                </Col>
                                </Row>
                            </div>
                    )
                })}
                <Button variant="outline-primary" onClick={addFields}>
                    Add another girl
                </Button>
                <Button style={{marginLeft: '20px'}} variant="outline-primary" onClick={removeFields}>
                    Remove Last
                </Button>

                <hr/>

                <Form.Check
                    type="switch"
                    id="policy-guidelines"
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/66953/document/original/2022-2023_VA9020_Policies___Guidelines_Handbook.pdf" target="_blank">AHG VA9020 Troop Policy & Guidelines Handbook</a> for the 2022-2023 program year, and agree to the Troop Policies and Guidelines contained therein.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="parent-participation"
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/66953/document/original/2022-2023_VA9020_Policies___Guidelines_Handbook.pdf" target="_blank">Parent Participation Policy</a> on page 9 of the Troop Policy & Guidelines Handbook, and agree to actively participate in the Troop and contribute to the Troop's success.</>)}
                    className='mb-3'
                    required
                />

                <hr />
                <p className="mb-3">Please select all volunteer areas of interest or experience.</p>

                <Form.Group onChange={(e) => { handleVolunteerChange(e)}} className="mb-3">
                    <Row>
                        <Col>
                                <Form.Check
                                    label="Childcare Team"
                                    name="group1"
                                    type="checkbox"
                                    value="childcare"
                                />

                                <Form.Check
                                    label="Greeter"
                                    name="group1"
                                    type="checkbox"
                                    value="greeter"
                                />

                                <Form.Check
                                    label="Unit Leader"
                                    name="group1"
                                    type="checkbox"
                                    value="unitLeader"
                                />

                                <Form.Check
                                    label="Assistant Unit leader"
                                    name="group1"
                                    type="checkbox"
                                    value="assistantLeader"
                                />

                                <Form.Check
                                    label="Administration / Registrar"
                                    name="group1"
                                    type="checkbox"
                                    value="registrar"
                                />

                                <Form.Check
                                    label="Fundraising"
                                    name="group1"
                                    type="checkbox"
                                    value="fundraising"
                                />

                            <Form.Check
                                label="Lifeguard Certified"
                                name="group1"
                                type="checkbox"
                                value="lifeguard"
                            />
                            <Form.Check
                                label="CPR Certified"
                                name="group1"
                                type="checkbox"
                                value="cpr"
                            />
                            <Form.Check
                                label="First Aid"
                                name="group1"
                                type="checkbox"
                                value="firstAid"
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                label="Special Events"
                                name="group1"
                                type="checkbox"
                                value="special_eventsCoordinator"
                            />

                            <Form.Check
                                label="Service Project"
                                name="group1"
                                type="checkbox"
                                value="serviceProject"
                            />

                            <Form.Check
                                label="Setup / Cleanup Team"
                                name="group1"
                                type="checkbox"
                                value="setupCleanupTeam"
                            />

                            <Form.Check
                                label="Troop Shepherd"
                                name="group1"
                                type="checkbox"
                                value="troopShepherd"
                            />

                            <Form.Check
                                label="Treasurer"
                                name="group1"
                                type="checkbox"
                                value="treasurer"
                            />

                            <Form.Check
                                label="Undecided - please have a board member contact me"
                                name="group1"
                                type="checkbox"
                                value="undecided"
                            />

                            <Form.Check
                                label="Other"
                                name="group1"
                                type="checkbox"
                                value="other"
                            />

                            <Form.Control
                                type="text"
                                name="other"
                                placeholder="Please Specify"
                                onChange={(e) => handleOtherChange(e)}
                                value={volunteerOther}
                                required
                            />
                        </Col>
                    </Row>

                </Form.Group>

                <hr />

                <Form.Check
                    type="switch"
                    id="troop-finances"
                    label={(<>I have reviewed the Troop Finances Information on page 10 of the <a href="">Troop Policy & Guidelines Handbook</a>, and I understand the costs associated with participation in AHG Troop VA9020.</>)}
                    className='mb-3'
                    required
                />

                <Row>
                    <Col md={1}>
                        <div onChange={(e) => handleKrogerParticipateChange(e)}>
                            <Form.Check
                                inline
                                name="kroger_participate"
                                type="radio"
                                label="Yes"
                                value="yes"
                                className='mb-3'
                                required
                            />
                            <Form.Check
                                inline
                                name="kroger_participate"
                                type="radio"
                                label="No"
                                value="no"
                                className='mb-3'
                                required
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        {(<>Does your family actively shop at Kroger, and will you participate in the Kroger Community Rewards Program fundraiser? (Answering No means that you are opting out and will pay the opt-out fee.)</>)}
                    </Col>
                </Row>

                <Row className="mb-3 mt-3">
                    <Col>
                        To update and/or confirm your Kroger Community Rewards designation, please go to <a href="https://www.kroger.com/account/communityrewards/" target="_blank">https://www.kroger.com/account/communityrewards/</a>. Our Troop, AHG VA9020 can be found using Organization Number: <b>NK998</b>.
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={1}>
                        <div onChange={(e) => handleKrogerEnrolledChange(e)}>
                            <Form.Check
                                inline
                                name="kroger_enrolled"
                                type="radio"
                                label="Yes"
                                value="yes"
                                className='mb-3'
                                required
                            />
                            <Form.Check
                                inline
                                name="kroger_enrolled"
                                type="radio"
                                label="No"
                                value="no"
                                className='mb-3'
                                required
                            />
                        </div>
                    </Col>
                    <Col md={10}>
                        {(<>I have actively enrolled in the Kroger Community Rewards program for the benefit of AHG Troop 9020 and will continue the designation throughout the Troop Program Year 2022-2023.</>)}
                    </Col>
                </Row>


                <hr />

                { totalShow &&
                    <Total
                        num={girls.length}
                        krogerValue={krogerParticipateValue}
                    />
                }


                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>

            </Form>
            </Col>
        </Row>
        <SuccessModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </Container>

}

export default UserForm;
