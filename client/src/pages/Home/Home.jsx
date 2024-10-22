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
      Home
    </div>
  );
};

export default OrganizedEmails;
