import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../errors/appError";
import { createToken } from "./user.utils";
import { User } from "./user.model";
import { TLoginUser, TUser } from "./user.interface";

const createUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email already used");
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  const jwtPayload = {
    name: user.name,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return accessToken;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};