import Page from '~/src/layout/page'
import ContentImage from '~/src/components/content-image'
import { getAllPostSlugs, getPostBySlug } from '~/src/utils/content-api'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import SpeakerDeckSlides from '~/src/components/speakerdeck-slides'
import Contents from '~/src/layout/contents'
import Header from '~/src/layout/header'

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Page title={post.title}>
      <Header>
        <h1 className="text-2xl xl:text-4xl font-bold">{post.title}</h1>
        <p className="uppercase tracking-wider my-2 text-lg xl:text-xl">{post.date}</p>
      </Header>
      <Contents>
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
          <figure className="w-full">
            <ContentImage src={post.image.header} alt={post.image.alt} />
            <figcaption dangerouslySetInnerHTML={{ __html: post.image.caption }} />
          </figure>
          <ReactMarkdownWithHtml children={post.content} allowDangerousHtml />
          {
            post.talk && (
              <SpeakerDeckSlides slidesId={post.talk.slidesId} slidesRatio={post.talk.slidesRatio} />
            )
          }
        </article>
      </Contents>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'image',
    'content',
    'talk'
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
