// import { generate } from "./GeminiSeparte.js";
// import emailsData from "./emailStorage.js";
// import { getDomains } from "../controllers/Email_domain_controller.js";

// const finalMails = async (req, res) => {

//   try {
//     const domains = await getDomains(req);
//     if (!domains || domains.length === 0) {
//       console.error("No domain categories available.");
//       return res
//         .status(400)
//         .json({ success: false, message: "No domain categories available." });
//     }

//     if (!Array.isArray(emailsData) || emailsData.length === 0) {
//       console.error("No emails to process or emailsData is not an array.");
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: "No emails to process or emailsData is not an array.",
//         });
//     }

//     const domainCategories = domains.map((domain) => domain.domainName);
//     const geminiResponse = await generate(emailsData, domainCategories);

//     if (!geminiResponse.success) {
//       return res
//         .status(500)
//         .json({ success: false, message: geminiResponse.message });
//     }

//     return res
//       .status(200)
//       .json({ success: true, categorizedEmails: geminiResponse.content });
//   } catch (error) {
//     console.error("Error in finalMails:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export default finalMails;




import { generate } from "./GeminiSeparte.js";
import emailsData from "./emailStorage.js";
import { getDomains } from "../controllers/Email_domain_controller.js";

const finalMails = async (req) => {
  try {
    const domains = await getDomains(req);
    if (!domains || domains.length === 0) {
      throw new Error("No domain categories available.");
    }

    if (!Array.isArray(emailsData) || emailsData.length === 0) {
      throw new Error("No emails to process or emailsData is not an array.");
    }

    const domainCategories = domains.map((domain) => domain.domainName);
    const geminiResponse = await generate(emailsData, domainCategories);

    if (!geminiResponse.success) {
      throw new Error(geminiResponse.message);
    }

    return { success: true, categorizedEmails: geminiResponse.content };
  } catch (error) {
    console.error("Error in finalMails:", error);
    throw error;
  }
};

export default finalMails;
