import { modelState } from '@/atoms/modelAtom'
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { BsCameraReels } from 'react-icons/bs'
import { db, storage } from '@/firebase'
import {addDoc, collection, doc, serverTimestamp, updateDoc} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref,getDownloadURL, uploadString } from 'firebase/storage'

const Model = () => {
    const [open,setopen] = useRecoilState(modelState)
    const [loading, setloading] = useState(false)
    const [selectedfile, setselectedfile] = useState(null)
    const {data:session} = useSession()
    const filePickref = useRef()
    const captionRef = useRef()
    const uploadPost = async()=>{
        if(loading)return;
        setloading(true)

        const docRef = await addDoc(collection(db,'posts'),{
            username:session?.user?.username,
            caption:captionRef.current.value,
            profileImage:session?.user?.image,
            timestamp:serverTimestamp()
        })
        console.log(docRef.id)
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imageRef,selectedfile,"data_url").then(async snapshot =>{
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db,'posts',docRef.id),{
                image:downloadURL
            })
        })
        setopen(false)
        setloading(false)
        setselectedfile(null)
    }
    const addImageToPost = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setselectedfile(readerEvent.target.result)
        }
    }
  return (
   <>
   {open && <Transition.Root show={open} as={Fragment}>
        <Dialog
            as='div'
            className='fixed inset-0 z-50 items-center justify-center h-screen mx-auto my-auto overflow-y-auto transition-transform ease-in-out delay-500 rounded-lg '
            onClose={()=>{setopen(false)}}
        >
            <div className='flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
                <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                    <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-400 bg-opacity-30"/>
                </Transition.Child>
                <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-4  sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                    <div className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                        {selectedfile ? 
                        <div>
                            <img onClick={()=>{setselectedfile(null)}} src={selectedfile} className='rounded-lg cursor-pointer h- ' alt="image" />
                        </div> : 
                        <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer'>
                            <BsCameraReels onClick={()=>{filePickref.current.click()}} aria-hidden="true" className='w-6 h-6 text-red-600' />
                        </div>
}
                        <div>
                            <div className='mt-3 text-center sm:mt-5'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium leading-6 text-gray-900'
                                >Upload Photo</Dialog.Title>
                                <div>
                                    <input type='file' onChange={addImageToPost} ref={filePickref} hidden/>
                                </div>
                                <div className="mt-2">
                                    <input ref={captionRef} type="text" placeholder='Please enter a caption' className='w-full px-2 py-1 mr-3 leading-tight text-center text-gray-700 bg-transparent border-none appearance-none focus:ring-0 hover:border-none focus:border-none focus:outline-none'/>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300' disabled={!selectedfile} onClick={uploadPost}>
                                    {loading ? "Uploading" : "Upload Post"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>}
   </>
  )
}

export default Model