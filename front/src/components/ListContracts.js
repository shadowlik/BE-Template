import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../api';
import Table from 'react-bootstrap/Table';

function ListContracts({ client }) {
    const [data, setData] = useState({ contracts: [] });

    useEffect(() => {
        api.listContracts().then((contracts) => {
            setData({ contracts })
        });
    }, [client]);

    const rows = data.contracts.map((result, i) => (<tr key={i}>
        <td>{result.id}</td>
        <td>{result.terms}</td>
        <td>{result.status}</td>
        <td>{new Date(result.createdAt).toLocaleDateString()}</td>
        <td>{result.ContractorId}</td>
        <td>{result.ClientId}</td>
    </tr>));

    return (
        <div>

            <h2>Non Terminated Contracts</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Terms</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Contractor ID</th>
                        <th>Client ID</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default ListContracts;