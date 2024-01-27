
import mongoose from "mongoose"
import { TErrorSource, TGenericsErrorResponse } from "../interface/global.interface"




export const monngooseValidationError = (err: mongoose.Error.ValidationError): TGenericsErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path,
      message: val?.message
    }
  })

  const statusCode = 400;
  return {
    statusCode,
    message: "Mongoose Validation Error!",
    errorSource
  }
}