import express from "express";
import {
    CreateBook,
    GetAllBooks,
    GetBookById,
    UpdateBook,
    DeleteBook
} from "../controllers/books/bookController.js";
import { sanitizeRequest } from "../middleware/sanitizeInput.js";

const router = express.Router();

router.use(sanitizeRequest);
router.post("/create", CreateBook);
router.get("/", GetAllBooks);
router.get("/:id", GetBookById);
router.put("/:id", UpdateBook);
router.delete("/:id", DeleteBook);

export default router;
