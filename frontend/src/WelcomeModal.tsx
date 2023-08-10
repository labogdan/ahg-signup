import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import woven from './image/WOVEN-logo.png';

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
            <Modal.Header closeButton>
                <img src={woven} style={{maxWidth: '300px'}} />
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to AHG VA9020 Signup Portal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>This is step 3 of the registration process.</strong>
                </p>
                <p>Please complete Step 1 and Step 2 - <a href="https://www.ahgfamily.org/login" target="_blank">AHGfamily Member Registration</a> first.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WelcomeModal;
