/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericsErrorResponse } from "../interface/global.interface"

export const monngooseDuplicateError = (err: any): TGenericsErrorResponse => {
  const regexPattern = (/"([^"]*)"/);
  const match = err.message.match(regexPattern);
  const extractMessage = match && match[1]

  const errorSource: TErrorSource = [{
    path: "",
    message: `${extractMessage} already in exists`
  }]

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error!",
    errorSource
  }
}