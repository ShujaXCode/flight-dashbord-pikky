/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import jwt from "jsonwebtoken";

export const signToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
