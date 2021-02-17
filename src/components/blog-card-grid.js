import BlogCard from '~/src/components/blog-card'

const BlogCardGrid = ({ articles }) => (
  <div className={'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-6 mb-4'}>
    {articles.map((article) => (
      <BlogCard key={article.slug.current} article={article}></BlogCard>
    ))}
  </div>
)

export default BlogCardGrid
