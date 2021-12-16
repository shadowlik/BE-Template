import React, { useState, useEffect } from 'react';
import api from '../api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

function AdminView() {
    const [data, setData] = useState({
        clients: [],
        profession: '',
    });

    useEffect(() => {
        Promise.all([
            api.admin.bestClients(),
            api.admin.bestProfession()
        ]).then(([clients, profession]) => {
            setData({ clients, profession: profession.profession })
        });
    }, []);

    const rows = data.clients.map((result, i) => (<tr key={i}>
        <td>{result.id}</td>
        <td>{result.fullName}</td>
        <td>{result.paid}</td>
    </tr>));

    return (
        <div>
            <h1>Admin</h1>
            <Row>
                <Col>
                    <h2>Top Clients</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h2>Top Profession</h2>
                    <Alert variant="success">
                        {data.profession}
                    </Alert>
                </Col>
            </Row>
        </div>
    );
}

export default AdminView;