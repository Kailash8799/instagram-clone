import React, { useEffect } from 'react'
import Link from 'next/link'
import { AiFillHome,AiOutlineSearch,AiOutlineHeart } from 'react-icons/ai';
import {MdExplore,MdCreateNewFolder} from 'react-icons/md'
import {SiAirplayvideo,SiGooglemessages} from 'react-icons/si'
import {CgProfile} from 'react-icons/cg'
import {useRouter} from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modelState } from '@/atoms/modelAtom';

const Sidebar = () => {
  const router = useRouter();
  const {data:session} = useSession();
  const [open,setopen] = useRecoilState(modelState)
  return (
     <>  
     {router.pathname !== "/auth/signin" && session ? <div> 
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-16 h-screen transition-transform -translate-x-full border-r border-gray-700 sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-black">
                <ul className="space-y-4 font-medium">
                    <li>
                        <a className="flex items-center p-2 my-4 text-gray-900 rounded-lg dark:text-white ">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        </a>
                    </li>
                    <li>
                       <Link href={"/"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <AiFillHome size={26}/>
                        </a></Link>
                    </li>
                    <li>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <AiOutlineSearch size={26} />
                       
                        </a>
                    </li>
                    <li>
                    <Link href={"/explore"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                       <MdExplore size={26}/>
                        </a></Link>
                    </li>
                    <li>
                    <Link href={"/reels"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <SiAirplayvideo size={26} />
                        </a></Link>
                    </li>
                    <li>
                    <Link href={"/messages"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <SiGooglemessages size={26} />
                        </a></Link>
                    </li>
                    <li>
                   <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                   <AiOutlineHeart size={26} />
                        </a>
                    </li>
                    <li>
                   <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=>{setopen(true)}}>
                   <MdCreateNewFolder size={26} />
                        </a>
                    </li>
                    <li>
                   <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                   <CgProfile size={26} />
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full border-r border-gray-700 lg:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-black">
            <ul className="space-y-4 font-medium">
                <li>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                    <span className="my-4 text-2xl font-bold">Photogram</span>
                    </a>
                </li>
                <li>
                <Link href={"/"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <AiFillHome size={26}/>
                    <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                   
                    </a></Link>
                </li>
                <li>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <AiOutlineSearch size={26}/>
                    <span className="flex-1 ml-3 whitespace-nowrap">Search</span>
                   
                    </a>
                </li>
                <li>
                <Link href={"/explore"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MdExplore size={26} />
                    <span className="flex-1 ml-3 whitespace-nowrap">Explore</span>
                    </a></Link>
                </li>
                <li>
                <Link href={"/reels"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <SiAirplayvideo size={26} />
                    <span className="flex-1 ml-3 whitespace-nowrap">Reels</span>
                    </a></Link>
                </li>
                <li>
                <Link href={"/meassages"} legacyBehavior><a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <SiGooglemessages size={26} />
                    <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                    </a></Link>
                </li>
                <li>
                    <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <AiOutlineHeart size={26}/>
                    <span className="flex-1 ml-3 cursor-pointer whitespace-nowrap">Notifications</span>
                    </a>
                </li>
                <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=>{setopen(true)}}>
                    <MdCreateNewFolder size={26} />
                    <span className="flex-1 ml-3 whitespace-nowrap">Create</span>
                    </a>
                </li>
                <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                   {session && session?.user?.image ?  
                    <Image src={session?.user?.image} alt='userimage' width={30} height={30} className='p-1 border rounded-full'/> : <CgProfile size={26} />}
                    <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                    </a>
                </li>
            </ul>
        </div>
        </aside>
        <div className='sm:hidden'>
       
            <div className="fixed bottom-0 w-full">
                <section id="bottom-navigation" className="fixed inset-x-0 bottom-0 z-10 block bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <Link href={"/"} legacyBehavior><a className="justify-center inline-block w-full pt-2 pb-1 text-center cursor-pointer focus:text-teal-500 hover:text-teal-500">
                            <AiFillHome size={36} className='mx-auto'/>
                            <span className="block text-xs tab tab-home">Home</span>
                        </a></Link>
                        <Link href={"/explore"} legacyBehavior><a className="justify-center inline-block w-full pt-2 pb-1 text-center cursor-pointer focus:text-teal-500 hover:text-teal-500">
                          <AiOutlineSearch size={36} className='mx-auto'/>
                            <span className="block text-xs tab tab-kategori">Explore</span>
                        </a></Link>
                        <a className="justify-center inline-block w-full pt-2 pb-1 text-center cursor-pointer focus:text-teal-500 hover:text-teal-500" onClick={()=>{setopen(true)}}>
                           <MdCreateNewFolder size={36} className='mx-auto'/>
                            <span className="block text-xs tab tab-explore">Create</span>
                        </a>
                        <Link href={"/reels"} legacyBehavior><a className="justify-center inline-block w-full pt-2 pb-1 text-center cursor-pointer focus:text-teal-500 hover:text-teal-500">
                            <SiAirplayvideo size={34} className='mx-auto'/>
                            <span className="block text-xs tab tab-whishlist">Whishlist</span>
                        </a></Link>
                        <a className="justify-center inline-block w-full pt-2 pb-1 text-center cursor-pointer focus:text-teal-500 hover:text-teal-500">
                        {session && session?.user?.image ?  
                    <Image src={session?.user?.image} alt='userimage' width={30} height={30} className='mx-auto border rounded-full '/> : <CgProfile size={26} className='mx-auto'/>}
                            <span className="block text-xs tab tab-account">Profile</span>
                        </a>
                    </div>
                </section>
            </div>
        </div>
        </div>
        
        : <div></div>}
    </>
  )
}

export default Sidebar