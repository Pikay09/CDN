import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ButtonAppBar from '../components/AppBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Complete Developer Network</title>
      </Head>
      <ButtonAppBar/>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
 