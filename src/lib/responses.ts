import { NextApiResponse } from "next";
import { ZodError } from "zod";

export function ResponseUnauthorized(res: NextApiResponse) {
  return res.status(401).json({
    error: 'Unauthorized'
  });
}

export function ResponseInternalServerError(res: NextApiResponse) {
  return res.status(500).json({
    error: 'Internal Server Error'
  })
}

export function ResponseZodError(res: NextApiResponse, error: ZodError) {
  return res.status(400).json({
    error: error.issues,
    success: false
  })
}