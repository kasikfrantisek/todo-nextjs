import arrowLeft from '../../public/assets/arrow-back-circle-outline.svg'
import arrowRight from '../../public/assets/arrow-forward-circle-outline.svg'
import edit from '../../public/assets/create-outline.svg'
import rid from '../../public/assets/trash-outline.svg'
import Image from 'next/image'
import { useState } from 'react'
import { Post } from '@prisma/client'
import Link from 'next/link'

export default function Task({task, fn}:{task:Post, fn:Function}){
    const [mouseOn, setMouseOn] = useState(false);
    const [clicked, setClicked] = useState(false)
    const changeMouse = () => {
       return setMouseOn(!mouseOn)
    }

    const changeClicked = () => {
        setClicked(!clicked);
        console.log('clicked')
    }

    const current = new Date().getTime()
    const time = (current - new Date(task.createdAt).getTime()) / 86400000;



    const deleteTask = (id:number) => {
        fetch(`api/delete/${id}`)
        .then(res => res.json())
        .then(() => fn())
    }

    const move = (direction:string, id:number) => {
        fetch(`/api/move/${direction}/${id}`)
        .then(res => res.json())
        .then(() => fn())
    }

    return(
        <div className='px-2 py-1 mb-1 border-solid border-black border-[1px]' onClick={changeClicked} onMouseEnter={changeMouse} onMouseLeave={changeMouse}>
            <h2 className="font-bold text-lg">{task.title}</h2>
            <p className="text-base">{task.content}</p>
            <div className={mouseOn || clicked ? 'flex justify-between' : 'hidden'}>
                <p className="font-bold text-sm">Created: {Math.floor(time)} days ago</p>
                <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => move('left', task.id)}><Image src={arrowLeft} width={24} height={24} alt='arrow left'/></button>
                    <button onClick={() => move('right', task.id)}><Image src={arrowRight} width={24} height={24} alt='arrow right'/></button>
                    <Link href={`/form?id=${task.id}`}><Image src={edit} width={24} height={24} alt='edit icon'/></Link>
                    <button onClick={() => deleteTask(task.id)}><Image src={rid} width={24} height={24} alt='delete icon'/></button>
                </div>
            </div>
        </div>
    )
}