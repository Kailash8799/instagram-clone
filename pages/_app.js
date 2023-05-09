import '@/styles/globals.css'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import LoadingBar from 'react-top-loading-bar'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RecoilRoot } from 'recoil'
import Model from '@/components/Model'

export default function App({ Component, pageProps:{session,...pageProps} }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  return <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <RecoilRoot>
    <Sidebar />
    <Model />
    <Component {...pageProps} setProgress={setProgress}/>
    </RecoilRoot>
    </SessionProvider>
  </>
}
