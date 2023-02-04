import HeaderComp from '../components/Header/index'
import Categories from '../components/Categories'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Post } from "@prisma/client";
import Loader from '../components/Loader'


export default function Home() {
  const urgency:String[] = ['Urgent', 'To do', "In progress", "Done"];
  const router = useRouter();
  const [data, setData] = useState<Post[]>();
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();
  const [change, setChange] = useState(false);
  
  const reload = () => setChange(!change);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        return router.push('/auth/signin');
      }
    };
    securePage();
  }, []);

  useEffect(() => {
    fetch(`/api/tasks/${session?.user.id}`)
    .then(res => res.json())
    .then((tasks) => {
      setData(tasks.data)
      setLoading(false)
    })
  },[session?.user.id, change]);


  if(loading) return <Loader />

 if(data) return (
    <>
      <HeaderComp userName={String(session?.user.name)}/>
      <div className='grid grid-cols-1 gap-2 md:max-[2000px]:grid-cols-4'>
      {urgency.map((category, index) => {
        return <Categories fn={reload} category={category} tasks={data} key={index} />
      })}
      </div>
    </>
  )

} 
