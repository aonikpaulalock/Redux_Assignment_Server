/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/global.interface";
import { zodHandelerError } from "../errors/zodError";
import { ZodError } from "zod";
import { AppError } from "../errors/appError";
import { monngooseValidationError } from "../errors/mongooseValidationError";
import { monngooseCastError } from "../errors/mongooseCastError";
import { monngooseDuplicateError } from "../errors/duplicateError";
import config from "../config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodHandelerError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = monngooseValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = monngooseCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = monngooseDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // actual return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENVIRONMENT === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;