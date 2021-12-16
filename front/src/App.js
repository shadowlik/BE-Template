import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ViewAs from './components/ViewAs';
import React, { useState, useEffect } from 'react';
import AdminView from './views/AdminView';
import ClientView from './views/ClientView';
import ContractorView from './views/ContractorView';
import { axios } from './api';

function App() {
  const [data, setData] = useState({
    user: {
      name: 'Admin',
      type: 'admin'
    }
  });

  function userChange(user) {
    setData({ user });
    axios.defaults.headers.common['profile_id'] = user.id;
  }


  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col><img src={logo} alt="Dell" /></Col>
            <Col className="App-header-ViewAs">
              <ViewAs user={data.user} onUserChange={userChange} />
            </Col>
          </Row>
        </Container>
      </header>
      <main>
        <Container>
          {data.user.type === 'admin' && <AdminView />}
          {data.user.type === 'client' && <ClientView client={data.user} />}
          {data.user.type === 'contractor' && <ContractorView contractor={data.user} />}
        </Container>
      </main>
    </div>
  );
}

export default App;
