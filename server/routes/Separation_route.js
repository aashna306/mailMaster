// import express from "express";
// import {
//   generateAuthUrl,
//   getOAuth2Token,
//   fetchEmails,
// } from "../Segregation/FetchMails.js";
// import finalMails from "../Segregation/FinalMails.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";
// import emailsData from "../Segregation/emailStorage.js";

// const router = express.Router();

// router.route("/auth").get((req, res) => {
//   const authUrl = generateAuthUrl();
//   res.redirect(authUrl);
// });

// router.route("/oauth2callback").get(async (req, res) => {
//   const code = req.query.code;
//   const userId = req.params.userId;

//   try {
//     await getOAuth2Token(code, userId);
//     const emailDetails = await fetchEmails(userId);
//     emailsData.push(...emailDetails);
//     // res.send('<script>window.opener.postMessage("authorizationComplete", "*"); window.close();</script>');
//     res.send(`
//       <script>
//         window.opener.postMessage("authorizationComplete", "${
//           req.protocol
//         }://${req.get("host")}");
//         window.close();
//       </script>
//     `);
//   } catch (error) {
//     console.error("Error in OAuth2 callback:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.route("/check/:userId").get(isAuthenticated, async (req, res) => {
//   try {
//     await finalMails(req, res);
//     const userId = req.params.userId;
//     const userEmails = emailsData.filter((email) => email.userId === userId);
//     res.status(200).json({ success: true, emails: userEmails });
//   } catch (error) {
//     console.error("Error in check route:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;

/////////////////////////////////////////////////////
import express from "express";
import {
  generateAuthUrl,
  getOAuth2Token,
  fetchEmails,
} from "../Segregation/FetchMails.js";
import finalMails from "../Segregation/FinalMails.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import emailsData from "../Segregation/emailStorage.js";

const router = express.Router();

router.route("/auth").get((req, res) => {
  const authUrl = generateAuthUrl();
  res.redirect(authUrl);
});

router.route("/oauth2callback").get(async (req, res) => {
  const code = req.query.code;
  const userId = req.params.userId;

  try {
    await getOAuth2Token(code, userId);
    const emailDetails = await fetchEmails(userId);
    emailsData.push(...emailDetails);
    // res.send('<script>window.opener.postMessage("authorizationComplete", "*"); window.close();</script>');
    res.send(`
      <script>
        window.opener.postMessage("authorizationComplete", "${
          req.protocol
        }://${req.get("host")}");
        window.close();
      </script>
    `);
  } catch (error) {
    console.error("Error in OAuth2 callback:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.route("/check/:userId").get(isAuthenticated, async (req, res) => {
  try {

    const data = await finalMails(req);



    res.status(200).json({ success: true, ...data});
  } catch (error) {
    console.error("Error in check route:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;
