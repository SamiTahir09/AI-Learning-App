import { count, error } from "console";
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
// Function to process PDF, extract text, chunk it and save to DB
const processPDF = async (documentId, filePath) => {
  try {
    const { text } = await extractTextFromPDF(filePath);
    const chunks = chunkText(text, 500, 50);
    const document = await Document.findById(documentId);
    if (!document) {
      throw new Error("Document not found during processing");
    }
    document.chunks = chunks;
    document.status = "ready";
    await document.save();
  } catch (error) {
    console.error("Error in processPDF:", error);
    await Document.findByIdAndUpdate(documentId, { status: "error" });
  } finally {
    //clean up uploaded file after processing
    await fs.unlink(filePath).catch(() => {});
  }
};

// GET /api/documents
export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcards",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzes",
        },
      },
      {
        $addFields: {
          flashcardCount: { $size: "$flashcards" },
          quizCount: { $size: "$quizzes" },
        },
      },
      {
        $project: {
          extractedText: 0,
          chunks: 0,
          flashcards: 0,
          quizzes: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
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
