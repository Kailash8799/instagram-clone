import React from 'react'
import kailas from "../images/kailash.jpg"
import Image from 'next/image'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'

const Stories = () => {
    const sto = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,17];
  return (
    <>
    <div className='flex items-center'>
    <MdChevronLeft size={40} className='relative z-50 hidden text-black sm:block shrink-0 dark:text-white'/>
        <div className='flex h-24 space-x-1 overflow-x-auto overflow-y-hidden sm:px-2 scrollbar-hide'>
           {sto.map((itm,ind)=>{
            return  <div key={ind} className='items-center w-20 my-auto cursor-pointer'>
            <div className=''>
                <Image src={kailas} alt="image" className='inline-block object-cover w-16 h-16 p-1 mx-auto transition-transform ease-in-out border-2 border-red-600 rounded-full hover:scale-110'/>
            </div>
            <div>
                <h1 className='text-center text-black truncate dark:text-white'>kailash8799vmbvj</h1>
            </div>
        </div>
           })}
           </div>
           <MdChevronRight size={40} color='white' className='relative z-50 hidden text-black sm:block shrink-0 dark:text-white'/>
        </div>
    </>
  )
}

export default Stories