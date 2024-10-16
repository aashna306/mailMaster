import express from 'express';
import { generateAuthUrl, getOAuth2Token, fetchEmails } from '../Segregation/FetchMails.js';
// import organizeEmailsByDomain from '../Segregation/FinalMails.js';

const router = express.Router();

// Helper function for error responses
const handleErrorResponse = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ success: false, message: error.message });
};

// Gmail API Authentication Route
router.route('/auth').get((req, res) => {
  const authUrl = generateAuthUrl();
  res.redirect(authUrl);
});

// OAuth2 callback route
router.route('/oauth2callback').get(async (req, res) => {
  const code = req.query.code;
  try {
    await getOAuth2Token(code);
    res.redirect('/emails'); // Redirect to emails route after successful authentication
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// Route to fetch emails
router.route('/emails').get(async (req, res) => {
  try {
    const emailDetails = await fetchEmails(); 
    res.json({ success: true, data: emailDetails });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// // Route to organize emails by domain
// router.route('/emails/organized').get(async (req, res) => {
//   try {
//     const organizedEmails = await organizeEmailsByDomain(); // Call the function and capture the result
//     res.status(200).json({ success: true, data: organizedEmails });
//   } catch (error) {
//     handleErrorResponse(res, error);
//   }
// });

export default router;
