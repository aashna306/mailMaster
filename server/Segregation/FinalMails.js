// import { fetchEmails } from './FetchMails.js';
// import { groupEmails } from './GeminiSeparte.js';
// import axios from 'axios';

// export const organizeEmailsByDomain = async () => {
//   try {
//     // Fetch emails using the function from FetchMails.js
//     const emails = await fetchEmails();
    
//     // Fetch domains from the backend
//     const domainResponse = await axios.get('http://localhost:5000/info/domains');
//     const domains = domainResponse.data;  // Assuming this returns an array of domains

//     // Organize emails by domains using the groupEmails function
//     const groupedEmails = groupEmails(emails, domains);

//     // Count the number of emails for each domain
//     const domainEmailCount = Object.entries(groupedEmails).map(([domain, emailList]) => {
//       return {
//         domainName: domain,
//         emailCount: emailList.length,
//         emails: emailList
//       };
//     });

//     // Output the organized email data
//     domainEmailCount.forEach(({ domainName, emailCount, emails }) => {
//       console.log(`Domain: ${domainName}`);
//       console.log(`Number of Emails: ${emailCount}`);
//       console.log('Emails:', emails);
//       console.log('------------------------------');
//     });
//   } catch (error) {
//     console.error('Error organizing emails by domain:', error);
//   }
// };

// // Export the function without calling it here
// export default organizeEmailsByDomain;


