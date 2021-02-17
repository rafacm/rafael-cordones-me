import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import { getAllPosts } from '~/src/utils/content-api'

export default function Index({ posts }) {
  return (
    <Page>
      <BlogCardGrid posts={posts} />
    </Page>
  )
}


export async function getStaticProps() {
  const posts = await getAllPosts([
    'title',
    'description',
    'date',
    'image',
    'tags'
  ])

  return {
    props: {
      posts
    }
  }
}
