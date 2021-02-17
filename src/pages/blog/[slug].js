import Page from '~/src/layout/page'
import { getAllPostSlugs, getPostBySlug } from '~/src/utils/content-api'
import markdownToHtml from '~/src/utils/markdown-to-html'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Page title={post.title}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}
      />
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
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content
      }
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
