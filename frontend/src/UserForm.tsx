import React, {useEffect, useState} from "react";
import UserService from './users'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
        console.log(form);
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            girls.map((value, index) => {
                console.log(index);
                console.log(value);
                try {
                    UserService.createUser([value.firstName, value.lastName, value.age, value.grade])
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

        console.log('here');
        setValidated(true);
        console.log('there');
        /*
        let user = JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                grade: grade
            })*/




    }

    useEffect( () => {
        console.log(girls);
        const shouldShow = girls[0].firstName.length > 0 && girls[0].lastName.length > 0;
        if (girls.length > 0 && shouldShow) {
            setTotalShow(true);
        }
    },[girls])

    return <Container style={{maxWidth: '800px'}}>
        <Header />
        <Row>
            <Col>
                <h1>Welcome to the Roanoke American Heritage Girls Signup Portal!</h1>
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
                    label={(<>I have reviewed the <a href="">AHG VA9020 Troop Policy & Guidelines Handbook</a> for the 2021-2022 program year, and do you agree to the Troop Policies and Guidelines contained therein.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={(<>I have reviewed the <a href="">Parent Participation Policy</a> on page 9 of the Troop Policy & Guidelines Handbook, and do you agree to actively participate in the Troop and contribute to the Troop's success.</>)}
                    className='mb-3'
                    required
                />

                <hr />
                <p className="mb-3">Each family needs to have a parent volunteer in some capacity for our troop.  Please select from any available positions that interest you.</p>

                <Form.Group className="mb-3">
                    <Form.Check
                        label="Childcare team"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Greeter"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Unit leader"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Assistant leader"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Registrar"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Fundraising"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Special Events Coordinator"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Service Project"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Setup / Cleanup Team"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Troop Shepherd"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Treasurer"
                        name="group1"
                        type="checkbox"
                    />

                    <Form.Check
                        label="Undecided - please have a board member contact me"
                        name="group1"
                        type="checkbox"
                    />

                </Form.Group>

                <hr />

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={(<>I have reviewed the Troop Finances Information on page 10 of the <a href="">Troop Policy & Guidelines Handbook</a>, and I understand the costs associated with participation in AHG Troop VA9020.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={(<>Does your family actively shop at Kroger, and will you participate in the <a href="https://www.kroger.com/i/community/community-rewards" target="_blank">Kroger Community Rewards Program fundraiser</a>? (Answering No means that you are opting out and will pay the opt-out fee.)  Search for "NK998".</>)}
                    className='mb-3'
                    required
                />

                { totalShow &&
                    <Total
                        num={girls.length}
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
