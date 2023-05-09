import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import Onepost from './Onepost';
import LoadingIcons from 'react-loading-icons'

const Post = () => {
  const [posts, setposts] = useState()
  const [spinner,setspinner] = useState(true)
      useEffect(() => {
        setspinner(true)
        const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot=>{
          setposts(snapshot.docs)
          console.log((snapshot.docs).map((it)=>{return it.id}));
       })
       setspinner(false)
       return ()=>{
        unsubscribe()
        setspinner(false)
       }
      }, [db])
  return (
    <>
      {!spinner && posts && posts.map((item)=>{
          return <Onepost 
          key={item.id}
          id={item.id}
          username={item.data().username}
          userImage={item.data().profileImage}
          img={item.data().image}
          caption={item.data().caption}
          time={item.data().timestamp}
          />
        })}
      {spinner && <div>
      <LoadingIcons.Bars className="mx-auto mt-40"/>
      </div>}
        <div className='h-20 sm:h-0'></div>
    </>
  )
}

export default Post