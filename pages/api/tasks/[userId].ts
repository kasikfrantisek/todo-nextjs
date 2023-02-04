import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { resolve } from "path";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  try {
   

    const tasks = await prisma.post.findMany({
      where: {
        userId: String(userId)
      }
    });

    

    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(400).send(err + "An Error has occured");
    resolve();
}
}