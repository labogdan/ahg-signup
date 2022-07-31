import Table from 'react-bootstrap/Table';


function SuccessModal(props: any) {

    const total = props.num * 35;

    return (
        <Table striped bordered hover>
            <tbody>
            <tr>
                <th>Troop VA9020 Dues</th>
                <th>$35 per girl</th>
            </tr>
            <tr>
                <td><b>Total Due</b></td>
                <td><b>${total}</b></td>
            </tr>
            </tbody>
        </Table>
    );
}

export default SuccessModal;
