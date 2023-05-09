import React from 'react'
import kailash from "../images/kailash.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Feed = () => {
  const {data:session} = useSession();
  const router = useRouter()
  const Logout = ()=>{
    signOut({callbackUrl:"/auth/signin"})
    // router.push("/auth/signin")
  }
  return (
    <>
        <div className="mx-auto">
          <div className="flex items-center justify-between mt-3">
             <div className="flex items-center space-x-2">
                <div>
                  <Image
                    src={session && session?.user?.image}
                    alt="profile image"
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{height:40}}
                    priority="true"
                  />
                </div>
                <div>
                  <h1 className="text-black dark:text-white">
                    <Link href={"/"} legacyBehavior><a>{session?.user?.username}</a></Link>
                  </h1>
                  <h1 className="text-black dark:text-white">
                    {session && session?.user?.name}
                  </h1>
                    </div>
              </div>
              <div className="xl:mr-28">
              <a className="text-blue-700 cursor-pointer dark:text-blue-700" onClick={Logout}><span onClick={Logout}>Logout</span> </a>
              </div>
             </div>
             <div className="flex justify-between mt-3 xl:mr-28">
                <h1 className="font-bold text-gray-900 dark:text-gray-400 ">Suggestions for you</h1>
                <Link href={"/"} legacyBehavior><a className="text-black dark:text-white">See All</a></Link>
             </div>
             <div className="flex items-center justify-between mt-3">
             <div className="flex items-center space-x-2">
                <div>
                  <Image
                    src={kailash}
                    alt="profile image"
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{height:40}}
                  />
                </div>
                <div>
                  <h1 className="text-black dark:text-white">
                    <Link href={"/"} legacyBehavior><a>kailash8799</a></Link>
                  </h1>
                  <h1 className="text-black dark:text-white">
                    Kailash Rajput
                  </h1>
                    </div>
              </div>
              <div className="xl:mr-28">
              <a className="text-blue-700 cursor-pointer dark:text-blue-700">Follow</a>
              </div>
             </div>
             <div className="flex flex-wrap mt-2">
                <a className="text-black dark:text-white" href="">About&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;Help&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;Press&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;API&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;Jobs&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;PrivacyTerms&nbsp;&#183;</a>
                <a className="text-black dark:text-white" href="">&nbsp;Location</a>
             </div>
             <div className="mt-3">
                <h1 className="text-black dark:text-white">© 2023 PHOTOGRAM FROM GRACE</h1>
             </div>
        </div>
    </>
  )
}

export default Feed