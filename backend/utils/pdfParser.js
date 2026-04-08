import fs from "fs/promises";
import { createRequire } from "module";

/**
 *Extract text from PDF file
 *@param {string} filePath -Path to PDf file
 *@returns {Promise<{text:string,numPages:number}>}
 */

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    // Node v20.15 misses process.getBuiltinModule, but pdfjs-dist expects it.
    if (typeof process.getBuiltinModule !== "function") {
      const require = createRequire(import.meta.url);
      process.getBuiltinModule = (moduleName) => require(moduleName);
    }

    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse(new Uint8Array(dataBuffer));
    const data = await parser.getText();

    return {
      text: data.text,
      numPages: data.numPages,
      info: data.info,
    };
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to extract text from PDf");
  }
};
