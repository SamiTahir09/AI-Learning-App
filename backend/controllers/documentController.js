import { error } from "console";
import Document from "../models/Documents.js";
import FlashCard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { chunkText } from "../utils/textChunker.js";
import fs from "fs/promises";
import mongoose from "mongoose";

// upload PDF document
// Post /api/documents/upload
// private
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Please upload a pdf file",
        statusCode: 400,
      });
    }
    const { title } = req.body;
    if (!title) {
    }
  } catch (error) {
    //clean up file on error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

// GET /api/documents
export const getDocuments = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// GET /api/document/:id
export const getDocument = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// GET /api/documents/:id
export const updateDocument = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// GET /api/document/:id
export const deleteDocument = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
