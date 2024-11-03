import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = [process.env.GOOGLE_SCOPES];
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const storeTokens = new Map();

export const generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
};

export const getOAuth2Token = (code, userId) => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, tokens) => {
      if (err) {
        console.error("Error retrieving access token:", err);
        reject(new Error("Error retrieving access token"));
      } else {
        oAuth2Client.setCredentials(tokens);
        storeTokens.set(userId, tokens);
        resolve();
      }
    });
  });
};

// export const fetchEmails = async (userId) => {
//   const tokens = storeTokens.get(userId);
//   if (!tokens) {
//     throw new Error("No tokens found");
//   }

//   oAuth2Client.setCredentials(tokens);
//   const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

//   try {
//     const response = await gmail.users.messages.list({
//       userId: "me",
//       maxResults: 10,
//     });

//     const messages = response.data.messages || [];

//     return await Promise.all(
//       messages.map(async (message) => {
//         const email = await gmail.users.messages.get({
//           userId: "me",
//           id: message.id,
//         });
//         const headers = email.data.payload.headers;

//         const from =
//           headers.find((header) => header.name === "From")?.value || "Unknown";
//         const to =
//           headers.find((header) => header.name === "To")?.value || "Unknown";
//         const subject =
//           headers.find((header) => header.name === "Subject")?.value ||
//           "No Subject";

//         let body = "";

//         if (email.data.payload.parts) {
//           const part = email.data.payload.parts.find(
//             (part) =>
//               part.mimeType === "text/plain" || part.mimeType === "text/html"
//           );
//           if (part?.body?.data) {
//             body = Buffer.from(part.body.data, "base64").toString("utf-8");
//           }
//         }
//         return {
//           from,
//           to,
//           subject,
//           message: body || "No message body found",
//         };
//       })
//     );
//   } catch (error) {
//     console.error("Error fetching emails:", error);
//     throw new Error("Error fetching emails");
//   }
// };

export const fetchEmails = async (userId) => {
  const tokens = storeTokens.get(userId);
  if (!tokens) {
    throw new Error("No tokens found");
  }

  oAuth2Client.setCredentials(tokens);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const messages = response.data.messages || [];

    return await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
        const headers = email.data.payload.headers;

        const from =
          headers.find((header) => header.name === "From")?.value || "Unknown";
        const to =
          headers.find((header) => header.name === "To")?.value || "Unknown";
        const subject =
          headers.find((header) => header.name === "Subject")?.value ||
          "No Subject";

        let body = "";

        if (email.data.payload.parts) {
          const part = email.data.payload.parts.find(
            (part) =>
              part.mimeType === "text/plain" || part.mimeType === "text/html"
          );
          if (part?.body?.data) {
            body = Buffer.from(part.body.data, "base64").toString("utf-8");
          }
        }


        const emailUrl = `https://mail.google.com/mail/u/0/#inbox/${message.id}`;

        return {
          from,
          to,
          subject,
          message: body || "No message body found",
          url: emailUrl,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw new Error("Error fetching emails");
  }
};
