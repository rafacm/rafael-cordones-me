import { Fragment } from 'react'
import Head from 'next/head'
import Navigation from '~/src/components/navigation'

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
        <div className="container mx-auto px-5">
          {children}
        </div>
      </>
    </>
  )
}

export default Page
