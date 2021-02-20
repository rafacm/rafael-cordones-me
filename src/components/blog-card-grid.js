import BlogCard from '~/src/components/blog-card'

const BlogCardGrid = ({ posts }) => (
  <div className={'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}>
    {posts.map((article) => (
      <BlogCard key={article.slug} post={article}></BlogCard>
    ))}
  </div>
)

export default BlogCardGrid
