import Link from 'next/link'

const BlogCard = ({ post }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg my-2">
      <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
        <a aria-label={post.title}>
          <img className="w-full object-cover" src={post.image.path} alt={post.image.alt} width="400" height="200"/>
          <div className="px-6 py-4">
            <div className="text-lg mb-2">{post.title}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default BlogCard
