import VideoCard from '@/components/VideoCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import LoadingIcons from 'react-loading-icons'

const Reels = ({setProgress}) => {
  const {data:session,status} = useSession();
  const router = useRouter()
  const [allvideos, setallvideos] = useState()
  const [spinner,setspinner] = useState(true)
  useEffect(() => {
    if(!session || status === "unauthenticated"){
      router.push("/auth/signin")
    }
    setProgress(30)
    setProgress(100) 
  }, [])

  useEffect(() => {
    setspinner(true)
    const unsubscribe = onSnapshot(query(collection(db,'reels'),orderBy('timestamp','desc')),snapshot=>{
      setallvideos(snapshot.docs)
      console.log(snapshot.docs[0].data())
      setspinner(false)
    })
    return ()=>{
     setspinner(false)
    unsubscribe()
   }
  }, [db])
  
  return (
    <>
      <div className="h-screen sm:p-4 lg:ml-64 sm:ml-16">
        
        <div className="mx-auto my-auto top-3 sm:rounded-lg reels_section shrink-0">
           {!spinner && allvideos && allvideos.map((itm)=>{
           return <VideoCard 
              key={itm.id}
              id = {itm.id}
              profileImage = {itm.data().profileImage}
              username={itm.data().username}
              caption={itm.data().caption}
              video={itm.data().image}
              time={itm.data().timestamp}
              song={itm.data().song}
              mensition={"Kailash Rajput"}
            />
          })}
          {spinner && <div>
      <LoadingIcons.Bars className="mx-auto mt-52"/>
      </div>}
        </div>
      </div>
    </>
  )
}

export default Reels