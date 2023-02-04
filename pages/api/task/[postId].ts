import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { resolve } from "path";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;
  try {
   

    const post = await prisma.post.findUnique({
      where:{
        id: Number(postId)
      }
    });

    

    res.status(200).json({ data: post });
  } catch (err) {
    res.status(400).send(err + "An Error has occured");
    resolve();
}
}