import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { resolve } from "path";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
   
    const { title, content, urgency }:{title:string, content:string, urgency:string} = req.body;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        urgency: urgency,
        userId: String(id),
      },
      select: {
        id: true,
      },
    });

    

    res.status(200).json({ data: post });
  } catch (err) {
    res.status(400).send(err + "An Error has occured");
    resolve();
}
}