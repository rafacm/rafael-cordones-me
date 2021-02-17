import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import { getAllArticles } from '~/src/utils/content-api'

export default function Index({ posts }) {
  return (
    <Page>
      <BlogCardGrid posts={posts} />
    </Page>
  )
}


export async function getStaticProps() {
  const posts = await getAllArticles()

  return {
    props: {
      posts
    }
  }
}
