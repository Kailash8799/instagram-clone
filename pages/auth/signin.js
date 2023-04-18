import React, { useEffect } from 'react'
import {getProviders, signIn, useSession} from "next-auth/react"
import { useRouter } from 'next/router';


const Signin = ({providers}) => {
    const {data:session, status} = useSession();
    const router = useRouter()
    useEffect(() => {
        if(session || status === "authenticated"){
            router.push("/")
        }
    }, [session])
    
  return (<>
        {!session && <div className="p-4 text-black dark:text-white">
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name} className='mx-auto text-center w-96 mt-44'>
          <button 
          onClick={(e) =>{ 
            e.preventDefault()
            signIn(provider.id,{callbackUrl:'/'})}
            }>
           <span className='p-4 text-black bg-blue-500 rounded-lg dark:text-white'> Sign in with {provider.name} </span>
          </button>
        </div>
      ))}
        </div> }
    </>
  )
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    
    return {
      props: {providers}, // will be passed to the page component as props
    }
  }

export default Signin