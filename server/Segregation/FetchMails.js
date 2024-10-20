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

