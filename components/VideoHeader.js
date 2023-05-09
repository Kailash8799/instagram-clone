import React from 'react'
import { BsCameraFill } from 'react-icons/bs'
import {IoArrowBackSharp} from 'react-icons/io5'
import styles from '../styles/Videoheader.module.css'
import { FaPlay } from 'react-icons/fa'

const VideoHeader = ({stop}) => {
  return (
    <>
        <div className={styles.videoHeader}>
            <IoArrowBackSharp size={24} className='text-white dark:text-white'/>
            <h1 className='z-50 text-xl font-bold text-white dark:text-white'>Reels</h1>
            <BsCameraFill size={24} className='text-white dark:text-white'/>
        </div>
        <div className={styles.pausebtn}>
        <FaPlay 
            className={` text-white ${stop ? "" : "hidden"} dark:text-white
        `}
        />
        </div>
    </>
  )
}

export default VideoHeader