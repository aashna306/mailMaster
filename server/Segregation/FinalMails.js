import { getDomains } from '../controllers/Email_domain_controller.js';
import { generate } from './GeminiSeparte.js';
import { fetchEmails } from './FetchMails.js';

const finalMails = async (req, res) => {
  try {
 
    const domains = await getDomains(req);

    const emails = await fetchEmails();

    domains.forEach(domain => {
      const createdAt = new Date(domain.createdAt);
      const date = createdAt.toLocaleDateString();
      const time = createdAt.toLocaleTimeString();

      console.log(`Domain Name: ${domain.domainName}, Created On: ${date}, Created At: ${time}`);
    });

    const geminiResponse = await generate(
      "Hey Gemini, can you group the emails for each domain I provide? Just make the group of emails for the same domain and provide the JSON format, where the key is the domain name.", 
      emails
    );
  console.log(geminiResponse)    
    return res.status(200).json({ domains, geminiResponse });

  } catch (error) {
    console.error('Error organizing emails by domain:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export default finalMails;
