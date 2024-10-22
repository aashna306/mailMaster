import express from 'express';
import { generateAuthUrl, getOAuth2Token, fetchEmails } from '../Segregation/FetchMails.js';
import { generate } from '../Segregation/GeminiSeparte.js';
import finalMails from '../Segregation/FinalMails.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

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

router.route('/api/content').post(async (req, res) => {
  try{
    let data = req.body.question;
    var result = await generate(data);
    console.log(result);
    return res.json({"result" : result});
  }catch(err){
    console.log(err);
  }
  
})
router.route("/check/:userId").get(isAuthenticated,finalMails);

export default router;
