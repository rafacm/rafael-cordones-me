import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import sanityClient from '~/src/utils/sanity-client'
import anylogger from 'anylogger'
const log = anylogger('BlogArticlePage')

const BlogArticlePage = ({ article }) => {
  return (
    <Page title={article.title}>
      <h1>{article.title}</h1>
    </Page>
  )
}

export default BlogArticlePage

export async function getServerSideProps({ params }) {
  log.info('getServerSideProps(): START', { params })
  const postQuery = `*[_type == "post" && slug.current == "jamming-with-graphcms-gatsbyjs-and-graphql"][0]`
  const response = await sanityClient.fetch(postQuery, {
    slug: params.slug,
  })

  log.info('getServerSideProps()', { response })

  return {
    props: {
      article: {
        title: "foo"
      }
    }
  }
}
