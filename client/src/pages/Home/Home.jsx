import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrganizedEmails = () => {
  const [emailData, setEmailData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizedEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/emails/organized');
        setEmailData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organized emails:', error);
        setLoading(false);
      }
    };

    fetchOrganizedEmails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Organized Emails by Domain</h2>
      {emailData.map((domain) => (
        <div key={domain.domainName}>
          <h3>Domain: {domain.domainName}</h3>
          <p>Email Count: {domain.emailCount}</p>
          <ul>
            {domain.emails.map((email, index) => (
              <li key={index}>
                <strong>From:</strong> {email.from} <br />
                <strong>To:</strong> {email.to} <br />
                <strong>Subject:</strong> {email.subject} <br />
                <strong>Message:</strong> {email.message} <br />
                <a href={email.url} target="_blank" rel="noopener noreferrer">View Email</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrganizedEmails;
