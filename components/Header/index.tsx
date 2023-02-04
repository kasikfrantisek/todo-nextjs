import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import out from '../../public/assets/log-out-outline.svg';
import add from '../../public/assets/add-circle-outline.svg';
import home from '../../public/assets/home-outline.svg'
import Image from "next/image";

export default function Header({userName}:{userName:String}){
    const router = useRouter();
    const page = router.pathname;
    return(
        <div className="flex p-5 border-solid border-2 border-black mb-5 font-bold justify-around flex-cols">
            <Link href={page === '/form' ? '/' : '/form'}>
            <Image src={page === '/form' ? home : add} width={25} height={25} alt='button' />
            </Link>
            <h1>{userName}</h1>
            <Image src={out} height={25} width={25} alt='log-out button' onClick={() => signOut()}  className="hover:cursor-pointer" />
        </div>
    )
}
