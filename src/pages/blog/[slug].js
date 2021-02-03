import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import { groq } from 'next-sanity'
import {
  getClient,
  urlFor,
  PortableText
} from '~/src/utils/sanity'
import anylogger from 'anylogger'
const log = anylogger('BlogArticlePage')

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    categories[]->{
      _id,
      title
    },
    "slug": slug.current
  }
`

const BlogArticlePage = ({ article }) => {
  return (
    <Page title={article.title}>
      <h1>{article.title}</h1>
    </Page>
  )
}

export default BlogArticlePage

export async function getServerSideProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })
  log.info('getServerSideProps()', post)

  return {
    props: {
      article: post
    }
  }
}
