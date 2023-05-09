import React, { useEffect, useRef, useState } from 'react'
import "../styles/Home.module.css"
import VideoHeader from './VideoHeader'
import VideoFooter from './VideoFooter'
import SideFooter from './SideFooter'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'

const VideoCard = ({id,username,profileImage,video,caption,time,mensition,song}) => {
    const videoref = useRef()
    const {data:session} = useSession()
    const [stop, setstop] = useState(true)
    const [likes, setlikes] = useState(100);
    const [comment, setcomment] = useState(20)
    const [share, setshare] = useState(10)
    const videoplaypause = ()=>{
        if(stop)
            videoref.current.play()
        else    
            videoref.current.pause()
        setstop(!stop)
    }
    const doLike = async()=>{
        await setDoc(doc(db,'reels',id,'likes',session?.user?.uid),{
            username:session?.user?.username,
            timestamp:serverTimestamp()
          })
    }
    const doDisLike = async()=>{
        await deleteDoc(doc(db,'reels',id,'likes',session?.user?.uid))
    }
    useEffect(() => {
      const unsub = onSnapshot(collection(db,'reels',id,'likes'),snapshot=>{
        setlikes(snapshot.docs.length)
      })
      return ()=>{
        unsub()
      }
    }, [db,id,likes])
    
  return (
    <div className='videoCard'>
       <SideFooter likes={likes} comment={comment} share={share}/>
        <div className="spinner_video"></div>
        <VideoHeader stop={stop}/>
        <video onDoubleClick={doLike} src={video} onClick={videoplaypause} ref={videoref} autoPlay={false} className='object-contain h-[100%] text-black rounded-lg dark:text-white video_class' alt='IG reel video' loop={true}/>
       <VideoFooter username={username} id={id} time={time} userImage={profileImage} caption={caption} mensition={mensition} song={song} />
    </div>
  )
}

export default VideoCard