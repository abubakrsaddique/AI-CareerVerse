import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("❌ JWT_SECRET is missing in .env file");
}

/**
 * Generate JWT token
 */
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
