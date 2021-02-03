import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import { groq } from 'next-sanity'
import {
  getClient,
  urlFor,
  PortableText
} from '~/src/utils/sanity'
import Logger from 'jet-logger'

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

export async function getStaticProps({ params }) {
  Logger.Info('BlogArticlePage.getStaticProps()', params)
  return {
    props: {
      article: {
        title: 'Foo'
      }
    }
  }
}

export async function getStaticPaths() {
  Logger.Info('BlogArticlePage.getStaticPaths()')
  return {
    paths: [
      { params: {slug: 'jamming-with-graphcms-gatsbyjs-and-graphql'}},
      { params: {slug: 'life-is-a-conversation'}}
    ],
    fallback: false
  }
}
