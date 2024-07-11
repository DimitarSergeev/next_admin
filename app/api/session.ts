import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/route";

// Define the structure of the session user object
interface SessionUser {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

// Define the structure of the session response
interface SessionResponse {
  user?: SessionUser;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionResponse>
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      // Ensure the structure aligns with the SessionResponse type
      res.status(200).json({ user: session.user || {} });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
