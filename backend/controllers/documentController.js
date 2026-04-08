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
      //delete uploaded file if title is missing
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        error: "Document Title is required",
        statusCode: 400,
      });
    }
    // construct the url for the uploaded file
    const baseUrl = `http://localhost:{process.env.PORT || 5001}`;
    const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

    // create document record

    const document = await Document.create({
      userId: req.user._id,
      title,
      fileName: req.file.originalname,
      filePath: fileUrl, // store the url instead of the local path
      fileSize: req.file.size,
      status: "processing",
    });
    //process PDF in background (in production,use a queue like bull or rabbitmq)
    processPDF(document._id, req.file.path).catch((err) => {
      console.error("Error processing PDF:", err);
    });
    res.status(201).json({
      success: true,
      data: document,
      message: "Document uploaded successfully, processing in background",
    });
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
