import React from 'react'
import {FcLike} from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'
import { IoShareSocialOutline } from 'react-icons/io5'
import {HiOutlineSaveAs, HiDotsHorizontal} from 'react-icons/hi'

const SideFooter = ({likes,comment}) => {
  return (
    <div className='absolute right-0 items-center justify-center space-y-4 border border-red-200 top-16' >
      <div>
      <FcLike size={30} color='red' className='text-red-600 dark:text-red-800'/>
      <h1 className='font-medium text-center text-white dark:text-white'>{likes}</h1>
      </div>
      <div>
      <FaRegComment size={30} color='white' className='text-white dark:text-white'/>
      <h1 className='font-medium text-center text-white dark:text-white'>{comment}</h1>
      </div>
      <IoShareSocialOutline size={30} color='white' className='text-white dark:text-white'/>
      <HiOutlineSaveAs size={30} color='white' className='text-white dark:text-white'/>
      <HiDotsHorizontal size={30} color='white' className='text-white dark:text-white'/>
    </div>
  )
}

export default SideFooter