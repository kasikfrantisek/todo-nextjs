import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { resolve } from "path";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { direction, postId } = req.query;
  const order = ["Urgent","To do", "In progress", "Done"];
  let urgency ='';
  

  
  try {
    const task = await prisma.post.findUnique({
        where:{
            id: Number(postId)
        },
        select:{
            urgency: true
        }
    })
   
    if(direction == 'right'){
        let index = order.indexOf(String(task?.urgency));
        urgency = order[(index + 1)%order.length]
    } else if(direction == 'left'){
        let index = order.indexOf(String(task?.urgency));
        if(index === 0){
            urgency = order[order.length - 1]
        } else {
            urgency = order[(index - 1)%order.length]
        }
    }


    const tasks = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data:{
        urgency: urgency
      }
    });

    

    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(400).send(err + "An Error has occured");
    resolve();
}
}