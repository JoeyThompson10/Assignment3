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
  const [updateAccounts, setUpdateAccounts] = useState('');
  const [updateTier, setUpdateTier] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    username: '',
    name: '',
    address: '',
    email: '',
  });
  const [deleteUsername, setDeleteUsername] = useState('');

  // Function to handle enter key press
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      fetchCustomers();
    }
  };

  // Check if field is empty
  const isFieldEmpty = (fieldValue) => {
    return !fieldValue || fieldValue.trim() === '';
  }

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

  // Function to update customer data
  const handleUpdate = async () => {
    if (isFieldEmpty(updateUsername) || isFieldEmpty(updateName) || isFieldEmpty(updateAddress) || isFieldEmpty(updateEmail) || isFieldEmpty(updateAccounts) || isFieldEmpty(updateTier)) {
      alert('Username, name, address, email, accounts, and tier are required to update a customer.');
      return;
    }
    const updateData = JSON.stringify({
      name: updateName,
      address: updateAddress,
      email: updateEmail,
      accounts: updateAccounts.split(','),
      tier: updateTier,
    });

    try {
      // calls endpoint with updateUsername as query parameter and updateData as modifier
      await axios.put('https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/putCustomers?username=' + updateUsername + '&updateData=' + updateData);
      fetchCustomers(); // Refresh data

      alert('Customer updated successfully.');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  // Function to create customer data
  const handlePost = async () => {
    if (isFieldEmpty(newCustomer.username) || isFieldEmpty(newCustomer.name) || isFieldEmpty(newCustomer.address) || isFieldEmpty(newCustomer.email) || isFieldEmpty(newCustomer.accounts) || isFieldEmpty(newCustomer.tier)) {
      alert('Username, name, address, email, accounts, and tier are required to create a customer.');
      return;
    }

    try {
      const newCustomerData = JSON.stringify({
        username: newCustomer.username,
        name: newCustomer.name,
        address: newCustomer.address,
        email: newCustomer.email,
        accounts: newCustomer.accounts.split(','),
        tier: newCustomer.tier,
      });

      await axios.post('https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/postCustomers?newCustomerData=' + newCustomerData);

      fetchCustomers(); // Refresh data

      alert('New customer created successfully.');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  // Function to delete customer data
  const handleDelete = async () => {
    if (isFieldEmpty(deleteUsername)) {
      alert('Username is required to delete a customer.');
      return;
    }
    try {
      await axios.delete(`https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/deleteCustomers?username=${deleteUsername}`);
      fetchCustomers(); // Refresh data

      alert('Customer deleted successfully.');
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
                  {customer.tier_and_details ? Object.values(customer.tier_and_details)
                    .map(detail => detail.tier)
                    .join(', ') : null}
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
          <input type="text" placeholder="Accounts" value={updateAccounts} onChange={e => setUpdateAccounts(e.target.value)} />
          <input type="text" placeholder="Tier" value={updateTier} onChange={e => setUpdateTier(e.target.value)} />
          <button onClick={handleUpdate}>Update Customer</button>
        </TabPanel>
        <TabPanel>
          <h2>Create Customer</h2>
          <input type="text" placeholder="Username" value={newCustomer.username} onChange={e => setNewCustomer({ ...newCustomer, username: e.target.value })} />
          <input type="text" placeholder="Name" value={newCustomer.name} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} />
          <input type="text" placeholder="Address" value={newCustomer.address} onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} />
          <input type="email" placeholder="Email" value={newCustomer.email} onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })} />
          <input type="text" placeholder="Accounts" value={newCustomer.accounts} onChange={e => setNewCustomer({ ...newCustomer, accounts: e.target.value })} />
          <input type="text" placeholder="Tier" value={newCustomer.tier} onChange={e => setNewCustomer({ ...newCustomer, tier: e.target.value })} />
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