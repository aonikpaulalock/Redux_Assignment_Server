/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


//! Password hash
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//! Remove Password in response
userSchema.methods.toJSON = function () {
  const cloneObj = this.toObject();
  delete cloneObj.password;
  return cloneObj;
};


//! Is User Exits with email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

//! Password Matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);