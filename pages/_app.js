import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (

   <SessionProvider session={session}>
   <Layout >
        <Head>
          <title>Nextjs Authentiction</title>
          <link rel="icon" href="/webDev.jpeg" />
          <meta name="description" content="Nextjs Authentiction" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div className='bg-gray-300 h-screen'>
          <Component {...pageProps} />
          <ToastContainer/>
        </div>
      </Layout>
   </SessionProvider>
   
  

  )

}
