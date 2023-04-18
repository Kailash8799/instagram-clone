import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import Onepost from './Onepost';

const Post = () => {
  const [posts, setposts] = useState()
      useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot=>{
          setposts(snapshot.docs)
       })
       return ()=>{
        unsubscribe()
       }
      }, [db])
  return (
    <>
      {posts && posts.map((item)=>{
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
    </>
  )
}

export default Post