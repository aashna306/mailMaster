import fs from 'fs';
import { google } from 'googleapis';

// Gmail API Setup
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const credentials = JSON.parse(fs.readFileSync("C:/Kabir Projects/Gmail Sambhalo/server/Segregation/credentials.json"));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Generate Auth URL
export const generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};

// Get OAuth2 Token
export const getOAuth2Token = (code) => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, tokens) => {
      if (err) {
        reject('Error retrieving access token');
      } else {
        oAuth2Client.setCredentials(tokens);
        resolve();
      }
    });
  });
};


// Fetch Emails
export const fetchEmails = async () => {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10, // Adjust as needed
    });

    const messages = response.data.messages;
    if (!messages || messages.length === 0) {
      return 'No emails found';
    }

    // Fetch details for each email and extract relevant information
    const emailDetails = await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });

        const headers = email.data.payload.headers;

        // Extract "From", "To", and "Subject" from headers
        const fromHeader = headers.find(header => header.name === 'From')?.value || 'Unknown';
        const toHeader = headers.find(header => header.name === 'To')?.value || 'Unknown';
        const subjectHeader = headers.find(header => header.name === 'Subject')?.value || 'No Subject';

        // Extract the message body (handling plain text or HTML parts)
        let messageBody = '';
        if (email.data.payload.parts) {
          const part = email.data.payload.parts.find(part => part.mimeType === 'text/plain' || part.mimeType === 'text/html');
          if (part && part.body && part.body.data) {
            messageBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
          }
        } else if (email.data.payload.body && email.data.payload.body.data) {
          messageBody = Buffer.from(email.data.payload.body.data, 'base64').toString('utf-8');
        }

        // Strip out HTML tags if the message is HTML
        messageBody = messageBody.replace(/<[^>]+>/g, '');

        // Limit the message length for consistent layout (200 characters max)
        const truncatedMessage = messageBody.length > 200 ? messageBody.substring(0, 200) + '...' : messageBody;

        // Construct URL to view email in Gmail
        const emailUrl = `https://mail.google.com/mail/u/0/#inbox/${message.id}`;

        // Return an object with the extracted details
        return {
          from: fromHeader,
          to: toHeader,
          subject: subjectHeader,
          message: truncatedMessage || 'No message body found',
          url: emailUrl, // Direct link to the email in Gmail
        };
      })
    );

    // Fetch domains and categorize emails

    return emailDetails;
  } catch (error) {
    throw new Error('Error fetching emails');
  }
};


// import fs from 'fs';
// import { google } from 'googleapis';
// import axios from 'axios'; 
// import { categorizeEmailsByDomain } from './GeminiSeparte.js'; 

// // Gmail API Setup
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const credentials = JSON.parse(fs.readFileSync("C:/Kabir Projects/Gmail Sambhalo/server/Segregation/credentials.json"));
// const { client_secret, client_id, redirect_uris } = credentials.web;
// const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// // Generate Auth URL
// export const generateAuthUrl = () => {
//   return oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
// };

// // // Get OAuth2 Token
// // export const getOAuth2Token = (code) => {
// //   return new Promise((resolve, reject) => {
// //     oAuth2Client.getToken(code, (err, tokens) => {
// //       if (err) {
// //         console.error("Error retrieving access token", err);
// //         reject('Error retrieving access token');
// //       } else {
// //         oAuth2Client.setCredentials(tokens);
// //         resolve();
// //       }
// //     });
// //   });
// // };
// // Get OAuth2 Token
// export const getOAuth2Token = (code) => {
//   return new Promise((resolve, reject) => {
//     oAuth2Client.getToken(code, (err, tokens) => {
//       if (err) {
//         console.error("Error retrieving access token", err);
//         reject('Error retrieving access token');
//       } else {
//         // Save the token to credentials.json or a database
//         fs.writeFileSync("C:/Kabir Projects/Gmail Sambhalo/server/Segregation/token.json", JSON.stringify(tokens));
//         oAuth2Client.setCredentials(tokens);
//         resolve();
//       }
//     });
//   });
// };

// // Load saved tokens
// const tokenPath = "C:/Kabir Projects/Gmail Sambhalo/server/Segregation/token.json";
// if (fs.existsSync(tokenPath)) {
//   const tokens = JSON.parse(fs.readFileSync(tokenPath));
//   oAuth2Client.setCredentials(tokens);
// } else {
//   console.log("No saved tokens found. Please authenticate.");
// }


// // Fetch Emails
// export const fetchEmails = async () => {
//   const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  
//   try {
//     console.log('Attempting to fetch emails from Gmail API...');
//     const response = await gmail.users.messages.list({
//       userId: 'me',
//       maxResults: 10, // Adjust as needed
//     });

//     console.log('Gmail API response received:', response.data);

//     const messages = response.data.messages;
//     if (!messages || messages.length === 0) {
//       console.log('No emails found.');
//       return 'No emails found';
//     }

//     // Fetch details for each email
//     const emailDetails = await Promise.all(
//       messages.map(async (message) => {
//         console.log(`Fetching email with ID: ${message.id}`);
//         const email = await gmail.users.messages.get({
//           userId: 'me',
//           id: message.id,
//         });

//         const headers = email.data.payload.headers;
//         const fromHeader = headers.find(header => header.name === 'From')?.value || 'Unknown';
//         const toHeader = headers.find(header => header.name === 'To')?.value || 'Unknown';
//         const subjectHeader = headers.find(header => header.name === 'Subject')?.value || 'No Subject';

//         let messageBody = '';
//         if (email.data.payload.parts) {
//           const part = email.data.payload.parts.find(part => part.mimeType === 'text/plain' || part.mimeType === 'text/html');
//           if (part && part.body && part.body.data) {
//             messageBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
//           }
//         } else if (email.data.payload.body && email.data.payload.body.data) {
//           messageBody = Buffer.from(email.data.payload.body.data, 'base64').toString('utf-8');
//         }

//         messageBody = messageBody.replace(/<[^>]+>/g, ''); // Strip HTML tags

//         const truncatedMessage = messageBody.length > 200 ? messageBody.substring(0, 200) + '...' : messageBody;
//         const emailUrl = `https://mail.google.com/mail/u/0/#inbox/${message.id}`;

//         return {
//           from: fromHeader,
//           to: toHeader,
//           subject: subjectHeader,
//           message: truncatedMessage || 'No message body found',
//           url: emailUrl,
//         };
//       })
//     );

//     console.log('Emails fetched successfully:', emailDetails);

//     // Fetch domains and categorize emails
//     const domains = await fetchDomains();
//     const categorizedEmails = categorizeEmailsByDomain(emailDetails, domains);

//     return categorizedEmails;
//   } catch (error) {
//     console.error('Error fetching emails:', error.message);
//     throw new Error('Error fetching emails');
//   }
// };

// // // Fetch Domains
// // const fetchDomains = async () => {
// //   try {
// //     const response = await axios.get('http://localhost:5000/info/domains');
// //     console.log(response);
// //     return response.data; 
// //   } catch (error) {
// //     console.error('Error fetching domains:', error.message);
// //     throw new Error('Error fetching domains');
// //   }
// // };

// const fetchDomains = async (res,req) => {
//   try {
//     const response = await axios.get('http://localhost:5000/info/domains', {
//       headers: {
//         Authorization: `Bearer ${req.cookies.token}`, // Replace with your actual auth token if needed
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching domains:', error.message);
//     throw new Error('Error fetching domains');
//   }
// };



