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
    const [krogerValue, setKrogerValue] = useState(false);
    const [volunteerValues, setVolunteerValues] = useState([]);

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

    const handleKrogerChange = (event: any) => {
        if (event.target.value === 'yes') {
            setKrogerValue(true)
        } else {
            setKrogerValue(false)
        }
    }

    useEffect(() => {
        console.log(volunteerValues);
    }, [volunteerValues])

    const handleVolunteerChange = (event: any) => {
        if (event.target.checked === true) {
            setVolunteerValues(volunteerValues => volunteerValues.concat(event.target.value))
        } else {
            setVolunteerValues(volunteerValues.filter(item => item !== event.target.value))

        }
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
                    UserService.createUser([value.firstName, value.lastName, value.age, value.grade, krogerValue, volunteerValues])
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
                    id="custom-switch"
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/66953/document/original/2022-2023_VA9020_Policies___Guidelines_Handbook.pdf" target="_blank">AHG VA9020 Troop Policy & Guidelines Handbook</a> for the 2021-2022 program year, and do you agree to the Troop Policies and Guidelines contained therein.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/66953/document/original/2022-2023_VA9020_Policies___Guidelines_Handbook.pdf" target="_blank">Parent Participation Policy</a> on page 9 of the Troop Policy & Guidelines Handbook, and do you agree to actively participate in the Troop and contribute to the Troop's success.</>)}
                    className='mb-3'
                    required
                />

                <hr />
                <p className="mb-3">Each family needs to have a parent volunteer in some capacity for our troop.  Please select from any available positions that interest you.</p>

                <Form.Group onChange={(e) => { handleVolunteerChange(e)}} className="mb-3">
                    <Row>
                        <Col>
                                <Form.Check
                                    label="Childcare team"
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
                                    label="Unit leader"
                                    name="group1"
                                    type="checkbox"
                                    value="unitLeader"
                                />

                                <Form.Check
                                    label="Assistant leader"
                                    name="group1"
                                    type="checkbox"
                                    value="assistantLeader"
                                />

                                <Form.Check
                                    label="Registrar"
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
                        </Col>
                        <Col>
                            <Form.Check
                                label="Special Events Coordinator"
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
                        </Col>
                    </Row>

                </Form.Group>

                <hr />

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={(<>I have reviewed the Troop Finances Information on page 10 of the <a href="">Troop Policy & Guidelines Handbook</a>, and I understand the costs associated with participation in AHG Troop VA9020.</>)}
                    className='mb-3'
                    required
                />

                <p>{(<>I confirm that I actively shop at Kroger, and will participate in the <a href="https://www.kroger.com/i/community/community-rewards" target="_blank">Kroger Community Rewards Program fundraiser</a>? (Answering No means that you are opting out and will pay the opt-out fee.)  Search for "NK998".</>)}</p>


                <div onChange={(e) => handleKrogerChange(e)}>
                <Form.Check
                    inline
                    name="kroger"
                    type="radio"
                    label="Yes"
                    value="yes"
                    className='mb-3'
                    required
                />
                <Form.Check
                    inline
                    name="kroger"
                    type="radio"
                    label="No"
                    value="no"
                    className='mb-3'
                    required
                />
                </div>

                <hr />


                { totalShow &&
                    <Total
                        num={girls.length}
                        krogerValue={krogerValue}
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
            resetForm={resetForm}
        />
    </Container>

}

export default UserForm;
