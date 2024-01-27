
import mongoose from "mongoose"
import { TErrorSource, TGenericsErrorResponse } from "../interface/global.interface"

export const monngooseCastError = (err: mongoose.Error.CastError): TGenericsErrorResponse => {

  const errorSource: TErrorSource = [{
    path: err?.path,
    message: err?.message
  }]

  const statusCode = 400;
  return {
    statusCode,
    message: "ID Error!",
    errorSource
  }
}