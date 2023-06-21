import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { ResponseInternalServerError, ResponseUnauthorized, ResponseZodError } from "@/lib/responses";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
})


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;
  const apiKey = req.headers.authorization;


  if (!apiKey) ResponseUnauthorized(res);

  try {
    const { text1, text2 } = reqSchema.parse(body);

    // Check that the user has a valid api key;

    const validApiKey = db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true
      }
    });

    if (!validApiKey) ResponseUnauthorized(res);



  } catch(error) {
    if (error instanceof z.ZodError) {
      ResponseZodError(res, error);
    }

    ResponseInternalServerError(res);
  }

}

export default withMethods(['POST'], handler);