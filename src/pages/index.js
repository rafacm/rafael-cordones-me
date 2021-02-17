import Page from '~/src/layout/page'
import BlogCardGrid from '~/src/components/blog-card-grid'
import sanityClient from '~/src/utils/sanity-client'

const Home = ({ articles }) => (
  <Page>
    <BlogCardGrid articles={articles} />
  </Page>
)

export default Home

export async function getStaticProps(context) {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedSt desc)`
  const response = await sanityClient.fetch(query)
  //console.log('getStaticProps: ', JSON.stringify(response, null, 2))
  return {
    props: {
      articles: { response }
    }
  }
}
