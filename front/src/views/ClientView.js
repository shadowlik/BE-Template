import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListContracts from '../components/ListContracts';
import ListUnpaidJobs from '../components/ListUnpaidJobs';

function ClientView({client}) {
    return (
        <div>
            <h1>Client: [{client.id}] {client.firstName} {client.lastName} - {client.profession}</h1>
            <Row>
                <Col>
                    <ListContracts client={client} />
                </Col>
                <Col>
                    <ListUnpaidJobs client={client} />
                </Col>
            </Row>
        </div>
    )
}

export default ClientView;