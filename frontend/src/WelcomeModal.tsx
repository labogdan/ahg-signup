import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to AHG VA9020 Signup Portal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    If you haven't already, please go to <a href="https://www.ahgfamily.org/login" target="_blank">AHGfamily</a> and register there first.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WelcomeModal;
