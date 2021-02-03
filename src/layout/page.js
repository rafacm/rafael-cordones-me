import { Fragment } from 'react'
import Head from "next/head";
import Navigation from '~/src/components/navigation'

const Page = ({ title, children }) => {
  return (
    <Fragment>
      {title && (
        <Head>
          <title>rafael cordones - {title}</title>
        </Head>
      )}
      <Fragment>
        <Navigation></Navigation>
        {children}
      </Fragment>
    </Fragment>
  )
}

export default Page;
