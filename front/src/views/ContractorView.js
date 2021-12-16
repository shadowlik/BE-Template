import ListContracts from "../components/ListContracts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContractorView({contractor}) {
    return (
        <div>
            <h1>Contractor: [{contractor.id}] {contractor.firstName} {contractor.lastName} - {contractor.profession}</h1>
            <Row>
                <Col>
                    <ListContracts client={contractor} />
                </Col>
                <Col>
                
                </Col>
            </Row>
        </div>
    )
}

export default ContractorView;