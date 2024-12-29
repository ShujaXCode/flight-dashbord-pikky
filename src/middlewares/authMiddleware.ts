/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import { verifyToken } from "@/lib/auth"; /
import { NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authentication required");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Authentication token missing");
  }

  try {
    const user = verifyToken(token); 
    return user;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    throw new Error("Invalid or expired token");
  }
}
