import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addEmail, getEmails, addDomain, getDomainsName } from "../controllers/Email_domain_controller.js";

const router = express.Router();

router.route("/add-email").post(isAuthenticated, addEmail);

router.route("/emails").get(isAuthenticated, getEmails);

router.route("/add-domain").post(isAuthenticated, addDomain);

router.route("/domains").get(isAuthenticated, getDomainsName);

export default router;
