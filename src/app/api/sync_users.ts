// pages/api/sync-users.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const CLERK_API_KEY = process.env.CLERK_SECRET_KEY;

  const response = await fetch("https://api.clerk.com/v1/users", {
    headers: {
      Authorization: `Bearer ${CLERK_API_KEY}`,
    },
  });

  const users = await response.json();

  // users endi Clerk’dagi barcha userlar massividir
  return res.status(200).json(users);
}
