import Page from '~/src/layout/page'
import { getAllPostSlugs, getPostBySlug } from '~/src/utils/content-api'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import ReactMarkdownWithHtml from 'react-markdown/with-html'

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Page title={post.title}>
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <h2>{post.title}</h2>
        <ReactMarkdownWithHtml children={post.content} allowDangerousHtml/>
      </article>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'image',
    'content'
  ])
  //const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs()

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug
        }
      }
    }),
    fallback: false
  }
}
