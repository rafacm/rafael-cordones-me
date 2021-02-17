import Link from 'next/link'
import Image from 'next/image'

const BlogCard = ({ post }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg my-2">
      <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
        <a aria-label={post.title}>
          <Image className="w-full" src={post.image.path} alt="Sunset in the mountains" width="350" height="200" objectFit='cover'/>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default BlogCard
