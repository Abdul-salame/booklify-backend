import express from "express";
import { CreateUser, LoginUser } from "../controllers/user/userController.js";
import { userValidator } from "../controllers/user/user-validator.js";
import { sanitizeRequest, handleValidationErrors } from "../middleware/sanitizeInput.js";

const router = express.Router();

router.use(sanitizeRequest);
router.post("/create", userValidator, handleValidationErrors, CreateUser);
router.post("/login", sanitizeRequest, LoginUser);

export default router;
