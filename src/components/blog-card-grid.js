import BlogCard from '~/src/components/blog-card'

const BlogCardGrid = ({ articles }) => {
  return (
    <div className={'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-6 mb-4'}>
      <BlogCard key={"1"}></BlogCard>
      <BlogCard key={"2"}></BlogCard>
      <BlogCard key={"3"}></BlogCard>
      <BlogCard key={"4"}></BlogCard>
      <BlogCard key={"5"}></BlogCard>
      <BlogCard key={"6"}></BlogCard>
      <BlogCard key={"7"}></BlogCard>
      <BlogCard key={"8"}></BlogCard>
      <BlogCard key={"9"}></BlogCard>
      <BlogCard key={"10"}></BlogCard>
      <BlogCard key={"11"}></BlogCard>
    </div>
  )
}

export default BlogCardGrid
