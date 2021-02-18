import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content/articles')

export function getAllPostSlugs() {
  const slugs =  fs.readdirSync(postsDirectory)
  return slugs.map((slug) => slug.replace(/\.md$/, ''))
}

export function getAllPosts(fields = []) {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const items = {
    'slug': realSlug
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  // Adjust the path to the image
  if (items['image']) {
    items['image']['card'] =
      adjustImagePathIfNeeded(items['image']['card'], realSlug)
    items['image']['header'] =
      adjustImagePathIfNeeded(items['image']['header'], realSlug)
  }

  return items
}

function adjustImagePathIfNeeded(imgPath, slug) {
  if (!imgPath.startsWith('/content/images')) {
    return `/content/images/${slug}/${imgPath}`
  }

  return imgPath
}
