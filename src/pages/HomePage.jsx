import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

function HomePage() {
  // State to hold customer data
  const [customers, setCustomers] = useState([]);

  // Function to fetch customer data
  const fetchCustomers = async () => {
  try {
    const response = await axios.get('https://us-east-2.aws.data.mongodb-api.com/app/application-0-pwpmz/endpoint/getCustomers');
    console.log("Response:" + JSON.stringify(response));
    console.log(response.data); // Log the response data to see its structure
    setCustomers(response.data);
  } catch (error) {
    console.error('Error fetching customer data:', error);
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
          {customers.map(customer => (
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
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="home-page">
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
          <Tab>Tab 4</Tab>
        </TabList>

        <TabPanel>
          <h2>Customer Data</h2>
          <button onClick={fetchCustomers}>Load Customers</button>
          {renderCustomerTable()}
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Content for Tab 4</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default HomePage;
