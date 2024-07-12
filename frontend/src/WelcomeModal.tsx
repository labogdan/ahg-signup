import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import glasses from './image/VISION-glasses.png';
import { Alert, Card } from 'react-bootstrap';

function WelcomeModal(props: any) {

    const closeModal = () => {
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{maxHeight: '200px'}} >
                <img src={glasses} style={{width: '300px'}} />
                <Modal.Title style={{fontFamily: 'EB Garamond', width: '400px'}} id="contained-modal-title-vcenter">
                    <h1>Welcome Girls!</h1>
                    <h3> We're excited to see you!</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card bg='light'>
                    <Card.Header>This is STEP 3: Troop Registration.</Card.Header>
                    <Card.Body>Have you completed Step 2 at <a href="https://www.ahgfamily.org/login" target="_blank">AHGfamily</a>? <br /> If yes, continue on, we are looking forward to seeing you this year! </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer style={{border: '0'}}>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WelcomeModal;
