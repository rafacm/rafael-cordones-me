import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import { getAllArticles } from '~/src/utils/content-api'

export default function Index({ articles }) {
  return (
    <Page>
      <BlogCardGrid articles={articles} />
    </Page>
  )
}


export async function getStaticProps() {
  const articles = await getAllArticles()

  return {
    props: {
      articles
    }
  }
}
