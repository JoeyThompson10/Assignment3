import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';

function HomePage() {
  const [customers, setCustomers] = useState([]);
  const [username, setUsername] = useState('');
  const [updateUsername, setUpdateUsername] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
  });
  const [deleteUsername, setDeleteUsername] = useState('');


  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      fetchCustomers();
    }
  };


  // Function to fetch customer data
  const fetchCustomers = async () => {
    try {
      let response;
      if (!username || username !== '') {
        response = await axios.get('https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/getCustomers?username=' + username);
      }
      else {
        response = await axios.get('https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/getCustomers');
      }

      console.log(JSON.stringify(response));
      setCustomers(response.data);
    }
    catch (error) {
      console.error('Error fetching customer data:', error);
    }

  };

  const handleUpdate = async () => {
    try {
      await axios.put('https://your-api-endpoint/set', { username: updateUsername, updateData: JSON.parse(updateData) });
      fetchCustomers(); // Refresh data
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handlePost = async () => {
    try {
      await axios.post('https://your-api-endpoint/post', JSON.parse(newCustomerData));
      fetchCustomers(); // Refresh data
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://your-api-endpoint/delete?username=${deleteUsername}`);
      fetchCustomers(); // Refresh data
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };


  // Function to render customer data in a table
  const renderCustomerTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Accounts</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map(customer => (
              <tr key={customer._id.$oid}>
                <td>{customer.username}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.accounts.join(', ')}</td>
                <td>
                  {Object.values(customer.tier_and_details)
                    .map(detail => detail.tier)
                    .join(', ')}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  };


  return (
    <div className="home-page">
      <Tabs>
        <TabList>
          <Tab>Get</Tab>
          <Tab>Put</Tab>
          <Tab>Post</Tab>
          <Tab>Delete</Tab>
        </TabList>

        <TabPanel>

          <h2>Customer Data</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button onClick={fetchCustomers}>Load Customers</button>


          {renderCustomerTable()}
        </TabPanel>
        <TabPanel>
          <h2>Update Customer</h2>
          <input type="text" placeholder="Username" value={updateUsername} onChange={e => setUpdateUsername(e.target.value)} />
          <input type="text" placeholder="Name" value={updateName} onChange={e => setUpdateName(e.target.value)} />
          <input type="text" placeholder="Address" value={updateAddress} onChange={e => setUpdateAddress(e.target.value)} />
          <input type="email" placeholder="Email" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} />
          <button onClick={handleUpdate}>Update Customer</button>
        </TabPanel>
        <TabPanel>
          <h2>Create Customer</h2>
          <input type="text" placeholder="Username" value={newCustomer.username} onChange={e => setNewCustomer({ ...newCustomer, username: e.target.value })} />
          <input type="text" placeholder="Name" value={newCustomer.name} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} />
          <input type="text" placeholder="Address" value={newCustomer.address} onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} />
          <input type="email" placeholder="Email" value={newCustomer.email} onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })} />
          <button onClick={handlePost}>Create Customer</button>
        </TabPanel>
        <TabPanel>
          <h2>Delete Customer</h2>
          <input type="text" placeholder="Username" value={deleteUsername} onChange={e => setDeleteUsername(e.target.value)} />
          <button onClick={handleDelete}>Delete Customer</button>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default HomePage;