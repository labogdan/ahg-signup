import React, { useState } from "react";
import UserService from './users'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Header from "./Header";


const UserForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [grade, setGrade] = useState('')

    let handleSubmit = async (e: any) => {
        e.preventDefault();

        /*
        let user = JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                age: age,
                grade: grade
            })*/


        UserService.createUser([firstName, lastName, age, grade])
            .then( () => {
                UserService.getAllAUsers()
                    .then( data => {
                        console.log(data.users);
                    })
            })

    }

    return <Container>
        <Header />
        <Row>
            <Col>
                <h5>Welcome to the Roanoke American Heritage Girls Signup Portal!</h5>
                <p>Please fill out the following form for each girl.</p>
            </Col>
        </Row>
        <Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
    </Container>

}

export default UserForm;
