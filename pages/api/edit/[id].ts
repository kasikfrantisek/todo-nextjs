import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { resolve } from "path";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const {title, content, urgency} : {title:string, content:string, urgency:string} = req.body
  try {
   

    const tasks = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data:{
        title: title,
        content: content,
        urgency: urgency
      }
    });

    

    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(400).send(err + "An Error has occured");
    resolve();
}
}