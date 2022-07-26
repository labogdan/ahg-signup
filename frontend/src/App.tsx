import React, { useState, useEffect } from 'react';
import UserService from './users'
import './App.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
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
    <div className="App">
        <Container>
            {
                users.map(function({first_name, last_name, id, grade}){
                    return (
                        <Row key={id}>
                            <Col>
                                <div>{first_name}</div>
                            </Col>
                            <Col>
                                <div>{last_name}</div>
                            </Col>
                            <Col>
                                <div>{grade}</div>
                            </Col>
                        </Row>
                    )
                })
            }

        </Container>
    </div>
  );
}

export default App;
