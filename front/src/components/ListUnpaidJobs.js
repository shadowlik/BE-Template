import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../api';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

function ListUnpaidJobs({ client }) {
    const [data, setData] = useState({ jobs: [] });

    useEffect(() => {
        api.listUnpaidJobs().then((jobs) => {
            setData({ jobs })
        });
    }, [client]);

    const rows = data.jobs.map((result, i) => (<tr key={i}>
        <td>{result.id}</td>
        <td>{result.description}</td>
        <td>{result.price}</td>
        <td><Badge bg={result.paid ? 'success' : 'warning'}>{result.paid ? 'Paid' : 'Pending'}</Badge></td>
        <td>{result.ContractId}</td>
    </tr>));

    return (
        <div>
            <h2>Unpaid Jobs</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Paid</th>
                        <th>Contract ID</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default ListUnpaidJobs;