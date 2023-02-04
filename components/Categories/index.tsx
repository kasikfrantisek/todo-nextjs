import Task from "../Task"
import {Post} from '@prisma/client'
import { useState } from "react";

export default function Categories({category, tasks, fn}:{category:String, tasks:Post[], fn:Function}){
    const [clicked, setClicked] = useState(false)
    
    const getNumberOfTasks = () => {
        let count = 0;
        tasks.forEach((task:Post) => {
            if(task.urgency === category){
                count++
            }
        })
        return count;
    }



    return(
        <div>
            <div onClick={() => setClicked(!clicked)} className="text-center flex flex-row justify-between font-bold text-xl border-solid border-[3px] mb-3 px-5 py-2 border-black sm:max-lg:hover:cursor-pointer">
                <h1>{category}</h1>
                <h1>{getNumberOfTasks()}</h1>
            </div>
            <div className={!clicked ? 'md:max-2xl:block': 'hidden md:max-2xl:block'}>
                {tasks.map((task:Post) => {
                if(task.urgency === category){
                    return <Task fn={fn} task={task} key={task.id}/>
                }
                })}
            </div>
        </div>
    )
} 