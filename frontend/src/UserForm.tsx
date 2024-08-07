import React, {useEffect, useState} from "react";
import UserService from './users'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Header from "./Header";
import SuccessModal from "./SuccessModal";
import WelcomeModal from "./WelcomeModal";
import Total from "./Total";

type Girl = {
    firstName: string,
    lastName: string,
    age: string,
    grade: string
}


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
    const [leaderValue, setLeaderValue] = useState([]);
    const [specifiedOther, setSpecifiedOther] = useState("");
    const [payPalAddress, setPayPalAddress] = useState("");
    const [isAdultLeader, setIsAdultLeader] = useState(false);

    const [churchDenomination, setChurchDenomination] = useState("");
    const [currentlyAttendingChurch, setCurrentlyAttendingChurch] = useState(false);
    const [churchName, setChurchName] = useState("");
    const [churchPhone, setChurchPhone] = useState("");    

    useEffect(() => {
        console.log(totalCost);
    }, [totalCost])

    const handleChurchNameChange = (event: any) => {
        setChurchName(event.target.value);
    }
    const handleChurchDenominationChange = (event: any) => {
        setChurchDenomination(event.target.value);
    }
    const handleChurchPhoneChange = (event: any) => {
        setChurchPhone(event.target.value);
    }
    const handleCurrentlyAttendingChurchChange = (value: boolean) => {
        console.log('handleCurrentlyAttendingChurchChange');
        console.log(value);
        setCurrentlyAttendingChurch(value);
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

    const handleLeaderChange = (event: any) => {
        console.log('leader change ' + event.target.defaultValue)
        console.log(' ')
        setLeaderValue(event.target.defaultValue)
    }


    const handleOtherChange = (event: any) => {
        setVolunteerOther(event.target.value);
    }

    const handleSpecifiedChange = (event: any) => {
        console.log('specified change ' + event.target.value)
        console.log(' ')
        setSpecifiedOther(event.target.value);
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
                    console.log('creating user: ' + [value.firstName, value.lastName, value.age, value.grade, churchDenomination, currentlyAttendingChurch, churchName, churchPhone, krogerParticipateValue, krogerEnrolledValue, volunteerValues, volunteerOther, leaderValue, specifiedOther, parentName, emailAddress, isAdultLeader, payPalAddress, totalCost])
                    UserService.createUser([value.firstName, value.lastName, value.age, value.grade, churchDenomination, currentlyAttendingChurch, churchName, churchPhone, krogerParticipateValue, krogerEnrolledValue, volunteerValues, volunteerOther, leaderValue, specifiedOther, parentName, emailAddress, isAdultLeader, payPalAddress, totalCost])
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

                <p><b>Church Information</b></p>
                <Row>
                    <Col xs={12} md={12}>
                        <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Local church and address (n/a if you do not attend church)"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="churchDenomination"
                                    placeholder="Church Denomination/Affiliation"
                                    value={churchDenomination}
                                    onChange={(e) => handleChurchDenominationChange(e)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter in the name and address of your church.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={12} md={12}>
                        Regularly Attending Church Services? &nbsp;
                        <ButtonGroup>
                            <Button
                                variant={currentlyAttendingChurch ? 'primary' : 'light'}
                                onClick={() => handleCurrentlyAttendingChurchChange(true)}
                            >
                                Yes
                            </Button>
                            <Button
                                variant={currentlyAttendingChurch? 'light' : 'primary'}
                                onClick={() => handleCurrentlyAttendingChurchChange(false)}
                            >
                                No
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                
                { currentlyAttendingChurch && (
                <>
                <br />
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Pastor Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="churchName"
                                    placeholder="Pastor Name"
                                    value={churchName}
                                    onChange={(e) => handleChurchNameChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter in the name of your church.
                                </Form.Control.Feedback>
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
                                    name="churchPhone"
                                    placeholder="Phone Number"
                                    value={churchPhone}
                                    onChange={(e) => handleChurchPhoneChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter in the phone number.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                </>
                )}
                
                <hr />
                <p><b>AHG Policies</b></p>
                <Form.Check
                    type="switch"
                    id="statement-of-faith"
                    label={(<>I have reviewed and agree to the <a href="https://media.trooptrack.com/troop_documents/70557/document/original/AHG_Statement_of_Faith.pdf" target="_blank">AHG Statement of Faith</a>.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="policy-guidelines"
                    label={(<>I have reviewed the <a href="https://styles.trooptrack.com/troop_documents/71700/document/original/AHG_VA9020_Orientation___Policy_Manual_2024-2025-Final.pdf" target="blank">Troop VA9020 Troop Orientation and Policy Manual</a> for the 2024-2025 program year, and agree to the Troop Policies and Guidelines contained therein.</>)}
                    className='mb-3'
                    required
                />

                <Form.Check
                    type="switch"
                    id="parent-participation"
                    label={(<>I have reviewed the <a href="https://styles.trooptrack.com/troop_documents/71700/document/original/AHG_VA9020_Orientation___Policy_Manual_2024-2025-Final.pdf" target="_blank">Family Responsibilities</a> section on page 7 of the Troop VA9020 Troop Orientation and Policy Manual, and agree to actively participate in the Troop and contribute to the Troop's success.</>)}
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
                <p><b>Service</b></p>
                <p className="mb-3">Please select all volunteer areas of interest or experience.</p>

                <Form.Group onChange={(e) => { handleVolunteerChange(e)}} className="mb-3">
                    <Row>
                        <Col>
                            <Form.Check
                                label="Administrative (Ongoing) / Record Keeping"
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
                                label="Fundraising Team"
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
                                label="Outdoor Activities Team"
                                name="group1"
                                type="checkbox"
                                value="outdooractivities"
                            />

                            <Form.Check
                                label="Security Team"
                                name="group1"
                                type="checkbox"
                                value="securityTeam"
                            />


                            <Form.Check
                                label="Service Projects Team"
                                name="group1"
                                type="checkbox"
                                value="serviceProject"
                            />

                        </Col>
                        <Col>

                            <Form.Check
                                label="Setup / Teardown Team"
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
                                label="Special Events Team"
                                name="group1"
                                type="checkbox"
                                value="special_eventsCoordinator"
                            />

                            <Form.Check
                                label="Troop Registrar"
                                name="group1"
                                type="checkbox"
                                value="registrar"
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
                                label="Troop Shepherd (Board)"
                                name="group1"
                                type="checkbox"
                                value="shepherd"
                            />
                            <Form.Check
                                label="Troop Treasurer (Board)"
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

                <hr />
                
                <p><b>Financial</b></p>
                
                
                
                <Form.Check
                    type="switch"
                    id="adult-leader"
                    label={(<><b>PLEASE READ</b>: The Board and I have discussed and agreed that this coming troop year, I have a Key Role Volunteer Position (Unit Leader, Assistant Unit Leader, Specified Other). I have already paid my AHG Adult Member Registration in AHGfamily. Please deduct my Adult Member Registration ($40) from my total Troop Dues.</>)}
                    className='mb-3'
                    checked={isAdultLeader}
                    onChange={(e) => {
                        handleAdultLeader(e)
                    }}
                />
                { isAdultLeader && (
                    <>
                    
                    
                    <Row>
                        <Col xs={10}>
                        <Form.Group onChange={(e) => { handleLeaderChange(e)}} className="mb-3">
                            <Form.Check inline
                                label="Unit Leader"
                                name="group1"
                                type="radio"
                                value="UnitLeader"
                            />

                            <Form.Check inline
                                label="Assistant Unit Leader"
                                name="group1"
                                type="radio"
                                value="AssistantUnitLeader"
                            />

                            <Form.Check inline
                                label="Specified Other"
                                name="group1"
                                type="radio"
                                value="specifiedOther"
                            />
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                type="text"
                                name="other"
                                placeholder="Specified Other"
                                onChange={(e) => handleSpecifiedChange(e)}
                                value={specifiedOther}
                            />
                        </Col>
                    </Row>

                

                    </>
                    
                )}
                
                <Form.Check
                    type="switch"
                    id="troop-finances"
                    label={(<>I have reviewed the Finance section, pages 8-11 of the <a href="https://styles.trooptrack.com/troop_documents/71700/document/original/AHG_VA9020_Orientation___Policy_Manual_2024-2025-Final.pdf" target="_blank">Policy Manual</a>, and I understand the costs associated with participation in AHG Troop VA9020.</>)}
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
                        <p><strong>Both AHGfamily Member registration and local VA9020 Troop dues must be completed and paid (PayPal preferred) in full in order to hold your spot(s) in the Troop. Payments and forms are due at the first AHG meeting, Monday, August 26th, 2024.</strong></p>
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
