import express from "express";
const router = express.Router();

import {
 getAllSubdomains,
 createSubdomain,
 deleteSubdomain,
} from "../controllers/subdomainController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


router.route("/getsubdomains").get( getAllSubdomains);
router.route("/create_subdomain").post(createSubdomain);
router.route("/delete_subdomain").post(deleteSubdomain);


export default router;
