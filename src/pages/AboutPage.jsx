import React from 'react';
import '../css/global.css';

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About This App</h1>
      <p>This application serves as a practical implementation of REST API operations (GET, PUT, POST, DELETE) in a cloud-based environment. It demonstrates how to manage customer data in a cloud database, showcasing real-world applications of cloud computing and API integration in modern web development.</p>
      <h2>Core Features</h2>
      <ul>
        <li><strong>REST API Integration:</strong> Utilizes GET, PUT, POST, and DELETE requests to interact with a cloud-based database, reflecting the CRUD (Create, Read, Update, Delete) operations essential in web applications.</li>
        <li><strong>Cloud Database Interaction:</strong> Demonstrates how to connect a React frontend with a cloud-hosted database, providing a scalable and flexible data management solution.</li>
      </ul>
      <h3>Technologies Used</h3>
      <p>The app is built using React, with Axios for API requests. It interfaces with a cloud database, showcasing how cloud computing is integrated into frontend development. The styling is achieved using CSS, which is easily customizable to suit different design needs.</p>
      <h4>Course Assignment Details</h4>
      <p>Assignment for SWE 4633 by Joseph Thompson (11/28/2023), under the guidance of Dr. Xia Li. The project aligns with the learning objectives of Module 6, focusing on cloud platform and REST API interactions.</p>
    </div>
  );
}

export default AboutPage;
