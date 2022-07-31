import Table from 'react-bootstrap/Table';


function SuccessModal(props: any) {

    const girlTotal = props.num * 50;
    const fee = props.krogerValue === false ? 40 : 0;
    const total = girlTotal + fee;

    return (
        <Table striped bordered hover>
            <tbody>
            <tr>
                <td><b>Troop VA9020 Dues</b></td>
                <td>$50 per girl</td>
            </tr>

            { fee > 0 && (
                <tr>
                    <td>Fundraiser Opt-Out Fee</td>
                    <td>$40 per family</td>
                </tr>
            )}

            <tr>
                <td><b>Total Due</b></td>
                <td><b>${total}</b></td>
            </tr>
            </tbody>
        </Table>
    );
}

export default SuccessModal;
