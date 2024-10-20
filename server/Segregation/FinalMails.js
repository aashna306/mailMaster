import fetch from 'node-fetch';

export const finalMails = async () => {
  try {
    // Fetch domains from the API with credentials
    const domainResponse = await fetch('http://localhost:5000/info/domains', {
      method: 'GET',
      credentials: 'include', 
    });

    if (!domainResponse.ok) {
      throw new Error(`Error fetching domains: ${domainResponse.status} ${domainResponse.statusText}`);
    }

    const data = await domainResponse.json();

    const domains = data.domains;

    console.log(domains);
    return domains;

  } catch (error) {
    console.error('Error organizing emails by domain:', error.message);
  }
};

export default finalMails;
