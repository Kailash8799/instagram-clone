import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { RxDotsHorizontal } from "react-icons/rx";
import Link from "next/link";
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {BsShareFill, BsSave, BsFillSaveFill} from 'react-icons/bs'
import { CgLogIn } from "react-icons/cg";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import {ImSpinner3} from 'react-icons/im'
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import 'moment-timezone';

function Onepost({id,username,userImage,img,caption,time}){
    const {data:session} = useSession()
    const [comment,setComment] = useState("")
    const [commentload, setcommentload] = useState(false)
    const [allcomment,setallcomment] = useState([])
    const [likes,setlikes] = useState([])
    const [hasLike,sethasLike] = useState(false)
    const [likescount,setlikescount] = useState(0)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),snapshot=>{
        setallcomment(snapshot.docs)
       })
       return ()=>{
        unsubscribe()
       }
      }, [db,id])

    useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db,'posts',id,'likes'),orderBy('timestamp','desc')),snapshot=>{
        setlikes(snapshot.docs)
       })
       console.log(likes);
       return ()=>{
        unsubscribe()
       }
      }, [db,id])

      useEffect(() => {
        sethasLike(likes.findIndex((like)=>like.id === session?.user?.uid) !== -1)
      }, [likes])
      
      useEffect(() => {
        const totalikesfun = onSnapshot(query(collection(db,'posts',id,'likes'),orderBy('timestamp','desc')),snapshot=>{
          setlikescount(snapshot.docs.length)
         })
         return ()=>{
          totalikesfun()
         }
      }, [db,id,likes])
      

      const doLike = async()=>{
          console.log("Liked")
          await setDoc(doc(db,'posts',id,'likes',session?.user?.uid),{
            username:session?.user?.username,
            timestamp:serverTimestamp()
          })
        }
        const doDisLike = async()=>{
          console.log("disLiked")
          await deleteDoc(doc(db,'posts',id,'likes',session?.user?.uid));
        }
        const sendComment = async()=>{
          setcommentload(true)
          const commentTosend = comment;
          setComment("")
          await addDoc(collection(db,'posts',id,'comments'),{
            comment:commentTosend,
            username:session?.user?.username,
            timestamp:serverTimestamp(),
            userImage:session?.user?.image
          })
          setcommentload(false)
        }
      
  return (
    <>
        <div className="my-4">
            <div className="flex items-center justify-between mx-auto sm:w-2/3">
              <div className="flex items-center space-x-3">
                <div>
                  <Image
                    src={userImage}
                    alt="profile image"
                    width={40}
                    height={40}
                    className="overflow-hidden border-2 border-red-700 rounded-full"
                    style={{objectFit:'cover',height:40}}
                  />
                </div>
                <div className="flex">
                  <h1 className="text-black dark:text-white">
                    <Link href={"/"} legacyBehavior><a>{username} &#183;&nbsp;</a></Link>
                  </h1>
                  <h1 className="text-black dark:text-white"><Moment fromNow>{time.toDate()}</Moment></h1>
                </div>
              </div>
              <div>
                <RxDotsHorizontal size={24} color="white" className="cursor-pointer"/>
              </div>
            </div>
            <div className="mx-auto mt-1 sm:w-2/3">
                <Image style={{objectFit:'contain'}} src={img} onDoubleClick={doLike} alt="kailash" className="mx-auto rounded-lg cursor-pointer" width={500} height={500}/>
            </div>
            <div className="flex items-center justify-between mx-auto mt-2 sm:w-2/3">
              <div className="flex items-center space-x-3">
                <div>
               {!hasLike ? <AiOutlineHeart id="likei" onClick={doLike} size={28} className="text-black transition-transform ease-in-out cursor-pointer dark:text-white hover:scale-110"/> :
                  <AiFillHeart id="dislikei" onClick={doDisLike} size={28} className="text-black transition-transform ease-in-out cursor-pointer dark:text-white hover:scale-110" color="red"/>}
                </div>
                <div>
                 <FaRegComment size={24} className="text-black cursor-pointer dark:text-white"/>
                </div>
                <div>
                 <BsShareFill size={22} className= "text-black cursor-pointer dark:text-white"/>
                </div>
              </div>
              <div>
                <BsSave size={24} color="white" className="cursor-pointer"/>
              </div>
            </div>
            <div className="mx-auto sm:w-2/3">
                <h1 className="text-black dark:text-white">{likescount} likes</h1>
            </div>
            <div className="mx-auto sm:w-2/3">
                <span className="text-black dark:text-white">{username} &nbsp;</span>
                <span className="text-black dark:text-white">{caption}</span>
            </div>

            {allcomment && allcomment.length > 0 && <div className="mx-auto overflow-y-scroll border-t border-b border-gray-700 scrollbar-hide max-h-24 sm:w-2/3 ">
               {allcomment && allcomment.map((itm)=>{
                return <div  className='flex items-center' key={itm.id}>
                  <div className='shrink-0'>
                   
                  <Image src={itm?.data()?.userImage} alt='userimage' width={20} height={20} className='rounded-full shrink-0'/>
                  
                  </div>
                  <div className='items-center'>
                  <h1 className='text-black dark:text-white'>{itm?.data()?.username}&nbsp; &#183;&nbsp;{itm?.data()?.comment}</h1>
                 {itm?.data()?.timestamp && <p className='text-black dark:text-blue-400'><Moment fromNow>{ itm?.data()?.timestamp.toDate()}</Moment></p>}
                    </div>
                </div>
               })}
            </div>}
            <div className="mx-auto sm:w-2/3">
                <div className="flex items-center" data-te-input-wrapper-init>
                <input
                    type="text"
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    className="peer text-black dark:text-white block min-h-[auto] w-full rounded bg-transparent mx-1 py-1 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:placeholder:text-white"
                    placeholder="Add a comment..." />
                    {!commentload ? <button disabled={comment.length === 0} className='text-blue-700 cursor-pointer disabled:text-blue-400' onClick={()=>{sendComment(id)}}>post</button> : <ImSpinner3 size={20} className='text-blue-600'/>}
                </div>
            </div>
          </div> 

    </>
  )
}

export default Onepost