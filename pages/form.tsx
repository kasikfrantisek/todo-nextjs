import { FieldValues, useForm } from "react-hook-form";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Post } from "@prisma/client";
import { useEffect } from "react";

export default function Form() {
    
    const router = useRouter();
    const {data: session} = useSession();
    const [data, setData] = useState<Post | undefined>();
    const postId = router.query.id;
    
    const { register, handleSubmit, reset } = useForm({
      defaultValues:{title:data?.title, content:data?.content, urgency:data?.urgency}
    });

    useEffect(() => {
      const securePage = async () => {
        const session = await getSession();
        if (!session) {
          return router.push('/auth/signin');
        }
      };
      securePage();
    }, []);

    if(postId){
      useEffect(() => {
        fetch(`/api/task/${postId}`)
        .then(res => res.json())
        .then((task) => {
          setData(task.data);
          reset(task.data)
        })
      },[]);

    } else{
      useEffect(()=>{
        setData(undefined);
      }, [])
    }
    
    const send = async (d: FieldValues) => {
    
      console.log(d)

        const JSONdata = JSON.stringify(d);
        
        const endpointCreate = `/api/add/${session?.user.id}`;
        const endpointEdit = `/api/edit/${postId}`;
    
        const optionsCreate = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSONdata,
        };

        const optionsEdit = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSONdata,
        };
    
        if(!postId){
          await fetch(endpointCreate, optionsCreate);
        } else {
          await fetch(endpointEdit, optionsEdit);
        }


        router.push("/");
      };

  return (
    <>
    <Header userName={String(session?.user.name)} />
      <form className="flex flex-col justify-center items-center w-full h-[80vh]" onSubmit={handleSubmit((data) => send(data))}>
        <label htmlFor='title'>Title</label>
        <input className="border-solid border-black border-2 w-2/3 p-1 md:max-2xl:w-2/4" {...register("title")} placeholder="Title" name="title" type='text' required />
        <label className="pt-10" htmlFor='content'>Details about your task</label>
        <textarea className="border-solid border-black border-2 w-2/3 p-1 md:max-2xl:w-2/4" rows={5}  {...register("content")} placeholder="Details about your task" name="content" required  />
        <label className="pt-10" htmlFor='urgency'>What is the status</label>
        <select className="border-solid border-black border-2 w-2/3 p-1 md:max-2xl:w-2/4" {...register("urgency")} required name="urgency" >
            <option value="Urgent"  >Urgent</option>
            <option value="To do" >To do</option>
            <option value="In progress" >In progress</option>
            <option value="Done" >Done</option>
        </select>
        <button className='border-solid border-2 border-black p-2 hover:bg-black hover:text-white mt-10' type="submit">Submit</button>
      </form>
    </>
  )

} 
