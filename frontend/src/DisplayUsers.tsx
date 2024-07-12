import React, {useEffect, useState} from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import UserService from './users'
import Header from "./Header";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from "react-bootstrap/Table";


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
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                        <th>Church Denomination</th>
                        <th>Currently Attending Church</th>
                        <th>Church Name</th>
                        <th>Church Phone</th>
                        <th>Kroger Participate</th>
                        <th>Kroger Enrolled</th>
                        <th>Volunteer Positions</th>
                        <th>Volunteer Other</th>
                        <th>Leader Value</th>
                        <th>Specified Other</th>
                        <th>Parent Name</th>
                        <th>Email Address</th>
                        <th>Is Adult Leader</th>
                        <th>Paypal Address</th>
                        <th>Total Cost</th>
                        </tr>


                            {
                                users.map(function({first_name, last_name, age, grade, church_denomination, currently_attending_church, church_name, church_phone, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, leader_value, specified_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost}){
                                    return (
                                        <tr >
                                            <td>{first_name}</td>
                                            <td>{last_name}</td>
                                            <td>{age}</td>
                                            <td>{grade}</td>
                                            <td>{church_denomination}</td>
                                            <td>{currently_attending_church}</td>
                                            <td>{church_name}</td>
                                            <td>{church_phone}</td>
                                            <td>{kroger_participate}</td>
                                            <td>{kroger_enrolled}</td>
                                            <td>{volunteer_positions}</td>
                                            <td>{volunteer_other}</td>
                                            <td>{leader_value}</td>
                                            <td>{specified_other}</td>
                                            <td>{parent_name}</td>
                                            <td>{email_address}</td>
                                            <td>{is_adult_leader}</td>
                                            <td>{paypal_address}</td>
                                            <td>{total_cost}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )

}

export default withAuthenticationRequired(DisplayUsers, {
    onRedirecting: () => <div>Redirecting you to the login page.  Please wait...</div>,
});
