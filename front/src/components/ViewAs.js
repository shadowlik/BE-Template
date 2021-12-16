import Dropdown from 'react-bootstrap/Dropdown';
import api from '../api';
import React, { useState, useEffect } from 'react';

function ViewAs(props) {
    const [data, setData] = useState({ users: [] });

    useEffect(() => {
        api.listUsers().then((users) => {
            users = users.map((user) => ({
              name: ` ${user.firstName} ${user.lastName} - ${user.type}`,
              ...user,
            }));
            setData({users});
        });
    }, []);

    const listItems = data.users.map((user, i) =>
      <Dropdown.Item onClick={() => props.onUserChange(user)} key={i + 1}>{user.name}</Dropdown.Item>
    );

    return (
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            View as {props.user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.onUserChange({
              name: 'Admin',
              type: 'admin'
            })} key="0">Admin</Dropdown.Item>
            {listItems}
          </Dropdown.Menu>
        </Dropdown>
    );
}

export default ViewAs;