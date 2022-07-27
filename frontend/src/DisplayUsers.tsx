import React, {useEffect, useState} from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import UserService from './users'
import Header from "./Header";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const DisplayUsers = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await UserService.getAllAUsers();
            const json = await data;
            setUsers(json.users);
            console.log(json.users);
        }
        fetchData()
            .catch(console.error);

    },[])

    return (
        <Container>
            <Header />
            <Row>
                <Col>
                    <b>First Name</b>
                </Col>
                <Col>
                    <b>Last Name</b>
                </Col>
                <Col>
                    <b>Age</b>
                </Col>
                <Col>
                    <b>Grade</b>
                </Col>
            </Row>
            {
                users.map(function({first_name, last_name, age, grade, id}){
                    return (
                        <Row key={id}>
                            <Col>
                                <div>{first_name}</div>
                            </Col>
                            <Col>
                                <div>{last_name}</div>
                            </Col>
                            <Col>
                                <div>{age}</div>
                            </Col>
                            <Col>
                                <div>{grade}</div>
                            </Col>
                        </Row>
                    )
                })
            }
        </Container>
    )

}

export default withAuthenticationRequired(DisplayUsers, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
