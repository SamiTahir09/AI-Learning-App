import express from "express";

import {
  updateDocument,
  uploadDocument,
  getDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";
import protect from "../middleware/auth.js";
import upload from "../config/multer.js";

const documentRouter = express.Router();
documentRouter.use(protect);

documentRouter.post("/upload", upload.single("file"), uploadDocument);
documentRouter.get("/", getDocuments);
documentRouter.get("/:id", getDocument);
documentRouter.delete("/:id", deleteDocument);
documentRouter.put("/:id", updateDocument);

export default documentRouter;
