import { Fragment } from 'react'
import Head from 'next/head'
import Navigation from '~/src/layout/navigation'
import Footer from '~/src/layout/footer'

const Page = ({ title, children }) => {
  return (
    <>
      {title && (
        <Head>
          <title>rafael cordones - {title}</title>
        </Head>
      )}
      <>
        <Navigation></Navigation>
        <div className="container mx-auto px-5 mt-2 mb-2">
          {children}
        </div>
        <Footer></Footer>
      </>
    </>
  )
}

export default Page
