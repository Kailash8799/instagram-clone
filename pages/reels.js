import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Reels = ({setProgress}) => {
  const {data:session,status} = useSession();
  const router = useRouter()
  useEffect(() => {
    if(!session || status === "unauthenticated"){
      router.push("/auth/signin")
    }
    setProgress(30)
    setProgress(100)
  }, [])
  return (
    <>
      <div className="p-4 lg:ml-64 sm:ml-16">
       reels page
      </div>
    </>
  )
}

export default Reels