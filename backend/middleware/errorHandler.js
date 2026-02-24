export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // mongoose bad objectId
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = "404";
  }
  // mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    statusCode = 400;
  }
  // mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.erros)
      .map((val) => val.message)
      .join(",");
    statusCode = 400;
  }
  //multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File size exceeds the maximum limit of 10MB";
    statusCode = 400;
  }
};
