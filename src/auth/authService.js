import bcrypt from "bcryptjs-react";

export const ConvertHashPassword = async (textPassword) => {
  const hashPassword = await bcrypt.hash(textPassword, 10);
  return hashPassword;
};

export const ComparePassword = async (newPassword, hashedPassword) => {
  const comparedPass = await bcrypt.compare(newPassword, hashedPassword);
  // console.log(comparedPass);

  return comparedPass;
};
