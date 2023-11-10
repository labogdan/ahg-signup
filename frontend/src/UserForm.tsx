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
import WelcomeModal from "./WelcomeModal";
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
    const [welcomeShow, setWelcomeShow] = React.useState(true);
    const [totalShow, setTotalShow] = React.useState(false);
    const [krogerShow, setKrogerShow] = React.useState(false);
    const [validated, setValidated] = useState(false);
    const [parentShow, setParentShow] = useState(false);

    const [totalCost, setTotalCost] = useState(0);
    const [parentName, setParentName] = useState("");
    const [emailAddress, setEmailAddress] = useState("")
    const [krogerParticipateValue, setKrogerParticipateValue] = useState(false);
    const [krogerEnrolledValue, setKrogerEnrolledValue] = useState(false);
    const [volunteerValues, setVolunteerValues] = useState([]);
    const [volunteerOther, setVolunteerOther] = useState("");
    const [payPalAddress, setPayPalAddress] = useState("");
    const [isAdultLeader, setIsAdultLeader] = useState(false);

    const [churchName, setChurchName] = useState("");
    const [churchWebsite, setChurchWebsite] = useState("");
    const [pastorName, setPastorName] = useState("");
    const [pastorPhone, setPastorPhone] = useState("");

    useEffect(() => {
        console.log(totalCost);
    }, [totalCost])


    const handleChurchNameChange = (event: any) => {
        setChurchName(event.target.value);
    }
    const handleChurchWebsiteChange = (event: any) => {
        setChurchWebsite(event.target.value);
    }
    const handlePastorNameChange = (event: any) => {
        setPastorName(event.target.value);
    }
    const handlePastorPhoneChange = (event: any) => {
        setPastorPhone(event.target.value);
    }

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
        const re = /^[0-9\b]+$/;

        if (event.target.name === 'age') {
            if (event.target.value === '' || re.test(event.target.value)) {
                // @ts-ignore
                data[index][event.target.name] = event.target.value;
                setGirls(data);
            }
        } else {
            // @ts-ignore
            data[index][event.target.name] = event.target.value;
            setGirls(data);
        }
    }

    const handleNameChange = (event: any) => {
        setParentName(event.target.value);
    }

    const handleEmailChange = (event: any) => {
        setEmailAddress(event.target.value);
    }

    const showParentInfo = (event: any) => {
        setParentShow(true);
    }

    const handleAdultLeader = (event: any) => {
        setIsAdultLeader(event.target.checked);
    }

    const handlePayPalChange = (event: any) => {
        setPayPalAddress(event.target.value);
    }

    const handleKrogerParticipateChange = (event: any) => {
        if (event.target.checked) {
            setKrogerShow(true);
        }
        setKrogerParticipateValue(event.target.checked);
    }

    const handleKrogerEnrolledChange = (event: any) => {
        setKrogerEnrolledValue(event.target.checked);
    }

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

    let handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            girls.map((value, index) => {
                try {
                    UserService.createUser([value.firstName, value.lastName, value.age, value.grade, churchName, churchWebsite, pastorName, pastorPhone, krogerParticipateValue, krogerEnrolledValue, volunteerValues, volunteerOther, parentName, emailAddress, isAdultLeader, payPalAddress, totalCost])
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
            // setTotalShow(true);
        }
    },[girls])

    return <Container style={{maxWidth: '800px'}}>
        <Header />
        <Row>
            <Col>
                <h1 style={{fontFamily: 'EB Garamond'}}>Welcome to American Heritage Girls <br /> Troop VA9020 Registration!</h1>
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
                                <Col xs={12} md={6}>
                                <Form.Group className="mb-3" >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Girl First Name"
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
                                <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Girl Last Name"
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
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/69759/document/original/AHG_VA9020_Orientation_Packet_2023-2024.pdf" target="_blank">AHG VA9020 Troop Policy & Guidelines Handbook</a> for the 2023-2024 program year, and agree to the Troop Policies and Guidelines contained therein.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="parent-participation"
                    label={(<>I have reviewed the <a href="https://media.trooptrack.com/troop_documents/69759/document/original/AHG_VA9020_Orientation_Packet_2023-2024.pdf" target="_blank">Parent Participation Policy</a> on page 9 of the Troop Policy & Guidelines Handbook, and agree to actively participate in the Troop and contribute to the Troop's success.</>)}
                    className='mb-3'
                    onChange={(e) => showParentInfo(e)}
                    required
                />

                { parentShow && (
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" >
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Parent First and Last Name"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        name="parentName"
                                        placeholder="Parent First and Last Name"
                                        value={parentName}
                                        onChange={(e) => handleNameChange(e)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please fill out your first and last name.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Parent Email Address"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={emailAddress}
                                        onChange={(e) => handleEmailChange(e)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please fill out your email address.
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                )}

                <hr />
                <p className="mb-3">Please select all volunteer areas of interest or experience.</p>

                <Form.Group onChange={(e) => { handleVolunteerChange(e)}} className="mb-3">
                    <Row>
                        <Col>
                            <Form.Check
                                label="Advancement / Records"
                                name="group1"
                                type="checkbox"
                                value="advancementrecords"
                            />

                            <Form.Check
                                label="Assistant Unit Leader"
                                name="group1"
                                type="checkbox"
                                value="assistantleader"
                            />

                            <Form.Check
                                label="Childcare Team"
                                name="group1"
                                type="checkbox"
                                value="childcare"
                            />

                            <Form.Check
                                label="CPR / First Aid Certified"
                                name="group1"
                                type="checkbox"
                                value="cpr"
                            />

                            <Form.Check
                                label="Fundraising Coordinator"
                                name="group1"
                                type="checkbox"
                                value="fundraising"
                            />

                            <Form.Check
                                label="Girl Leadership or Big / Little Sister"
                                name="group1"
                                type="checkbox"
                                value="girlleadership"
                            />

                            <Form.Check
                                label="Health & Safety Lead"
                                name="group1"
                                type="checkbox"
                                value="healthandsafety"
                            />

                            <Form.Check
                                label="Lifeguard Certified"
                                name="group1"
                                type="checkbox"
                                value="lifeguard"
                            />

                            <Form.Check
                                label="Outdoor Activities Coordinator"
                                name="group1"
                                type="checkbox"
                                value="outdooractivities"
                            />

                            <Form.Check
                                label="Registrar"
                                name="group1"
                                type="checkbox"
                                value="registrar"
                            />


                            <Form.Check
                                label="Service Project Coordinator"
                                name="group1"
                                type="checkbox"
                                value="serviceProject"
                            />

                        </Col>
                        <Col>

                            <Form.Check
                                label="Setup / Teardown"
                                name="group1"
                                type="checkbox"
                                value="setupCleanupTeam"
                            />
                            
                            <Form.Check
                                label="Sign In / Sign Out Team"
                                name="group1"
                                type="checkbox"
                                value="greeter"
                            />

                            <Form.Check
                                label="Special Events Helper"
                                name="group1"
                                type="checkbox"
                                value="special_eventsCoordinator"
                            />

                            <Form.Check
                                label="Unit Leader"
                                name="group1"
                                type="checkbox"
                                value="unitLeader"
                            />

                            <Form.Check
                                label="Troop Coordinator (Board)"
                                name="group1"
                                type="checkbox"
                                value="troopcoordinator"
                            />
                            <Form.Check
                                label="Assistant Troop Coordinator (Board)"
                                name="group1"
                                type="checkbox"
                                value="assistanttc"
                            />
                            <Form.Check
                                label="Shepherd (Board)"
                                name="group1"
                                type="checkbox"
                                value="shepherd"
                            />
                            <Form.Check
                                label="Treasurer (Board)"
                                name="group1"
                                type="checkbox"
                                value="reasurer"
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
                            />
                        </Col>
                    </Row>

                </Form.Group>

                <Form.Check
                    type="switch"
                    id="adult-leader"
                    label={(<>The Board and I have discussed and agreed that this coming troop year 2023-2024, I have a Key Role Volunteer Position (Unit Leader, Assistant Unit Leader, Specified Other). I have already paid my AHG Adult Member Registration in AHGfamily. Please deduct my Adult Member Registration ($40) from my total Troop Dues.</>)}
                    className='mb-3'
                    checked={isAdultLeader}
                    onChange={(e) => {
                        handleAdultLeader(e)
                    }}
                />

                <hr />
                <p>Church Information</p>
                <Row>
                    <Col>
                    <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Family Church"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="churchName"
                                    placeholder="Family Church"
                                    value={churchName}
                                    onChange={(e) => handleChurchNameChange(e)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter in the name of your church.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Website / Physical Address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="churchWebsite"
                                    placeholder="Website / Physical Address"
                                    value={churchWebsite}
                                    onChange={(e) => handleChurchWebsiteChange(e)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Pastor's Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="pastorName"
                                    placeholder="Pastor's Name"
                                    value={pastorName}
                                    onChange={(e) => handlePastorNameChange(e)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone Number"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="tel"
                                    name="pastorPhone"
                                    placeholder="Phone Number"
                                    value={pastorPhone}
                                    onChange={(e) => handlePastorPhoneChange(e)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter in the phone number.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                
                <hr />
                <Form.Check
                    type="switch"
                    id="troop-finances"
                    label={(<>I have reviewed the Troop Finances Information on page 10 and 11 of the <a href="https://media.trooptrack.com/troop_documents/69759/document/original/AHG_VA9020_Orientation_Packet_2023-2024.pdf" target="_blank">Troop Policy & Guidelines Handbook</a>, and I understand the costs associated with participation in AHG Troop VA9020.</>)}
                    className='mb-3'
                    onChange={(e) => {setTotalShow(true)}}
                />

                {totalShow &&
                <>
                    <Form.Check
                        type="switch"
                        id="troop-finances-pipa"
                        label={(<>I understand there is an additional cost for uniforms and handbooks, as well as special events, activities, and at-home badges/patches.</>)}
                        className='mb-3'
                        required
                    />

                </>
                }

                <Form.Check
                    type="switch"
                    id="kroger_participate"
                    label={(<>My family actively shops at Kroger, and will participate in the Kroger Community Rewards Program fundraiser. (Answering No means that you are opting out and will pay the opt-out fee.)</>)}
                    className='mb-3'
                    onChange={(e) => {handleKrogerParticipateChange(e)}}
                    checked={krogerParticipateValue}
                />


                {krogerShow && (
                    <>
                    <Row className="mb-3 mt-3">
                        <Col>
                            Please update and confirm your Kroger Community Rewards designation, here <a
                            href="https://www.kroger.com/account/communityrewards/"
                            target="_blank">https://www.kroger.com/account/communityrewards/</a>. Our Troop, AHG VA9020
                            can be found using Organization Number: <b>NK998</b>.
                        </Col>
                    </Row>

                     {(<></>)}
                        <Form.Check
                            type="switch"
                            id="kroger_enrolled"
                            label={(<>I have actively enrolled in the Kroger Community Rewards program for the benefit of AHG Troop 9020 and will continue the designation throughout the Troop Program Year 2023-2024.</>)}
                            className='mb-3'
                            onChange={(e) => {handleKrogerEnrolledChange(e)}}
                            checked={krogerEnrolledValue}
                        />
                    </>
                    )
                }

                <hr />

                { totalShow &&
                    <>
                        <Total
                            num={girls.length}
                            krogerParticipateValue={krogerParticipateValue}
                            krogerEnrolledValue={krogerEnrolledValue}
                            pipas={girls}
                            isAdultLeader={isAdultLeader}
                            setTotalCost={setTotalCost}
                        />

                    </>
                }


                    <>
                        <p>After you submit your registration, you will receive a PayPal invoice for your balance due to the troop. You may pay online or by check to avoid transaction fees. No cash, please.</p>
                        <p><strong>Troop dues must be received after one AHG official meeting/event in order to continue participating with our troop.</strong></p>
                        <p>Please provide your PayPal email address and/or email address for other invoicing.</p>
                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="PayPal Address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="PayPal Address"
                                    value={payPalAddress}
                                    onChange={(e) => handlePayPalChange(e)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill out your email address.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </>


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
        <WelcomeModal
            show={welcomeShow}
            onHide={() => setWelcomeShow(false)}
        />
    </Container>

}

export default UserForm;
