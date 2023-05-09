import React from 'react'
import styles from '../styles/Videofooter.module.css'
import {GiLoveSong} from 'react-icons/gi'
import { FaUserPlus } from 'react-icons/fa'

const VideoFooter = ({caption,username,userImage,song,mensition}) => {
  return (
    <div className={styles.footer}>
        <div className={`${styles.titlefooter}`}>
            <img src={userImage} alt="userImage" width={28} height={28} className='z-50 rounded-full' />
          <div className='mx-2'>
            <h1 className='z-50 text-white dark:text-white'>{username}&nbsp;&nbsp; &#x2022;</h1>
          </div>
            <h1 className='z-50 font-bold text-blue-800 cursor-pointer dark:text-blue-600'>Follow</h1>
        </div>
        <div>
          <h1 className='text-white dark:text-white'>{caption}</h1>
        </div>
        <div className={styles.videoFotter_ticker}>
          <div className='flex items-center w-2/3'>
          <GiLoveSong color='white' className=''/>
        <marquee>
        <h1 className='text-white dark:text-white'>{song}</h1>
        </marquee>
        </div>
       {mensition && <div className='flex items-center w-1/3 space-x-1'>
            <FaUserPlus />
            <h1>{mensition}</h1>
        </div>}
        </div>
    </div>
  )
}

export default VideoFooter