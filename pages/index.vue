<template>
  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
    <NuxtLink
      v-for="article of articles"
      :key="article.slug"
      :to="{ name: 'blog-slug', params: { slug: article.slug } }"
    >
      <div class="rounded overflow-hidden shadow-lg">
        <content-image
          class="w-full h-56"
          :dir="article.dir"
          :src="article.image.path"
          :alt="article.image.alt"
        />

        <div class="p-4 h-20">
          <h2 class="font-hairline">{{ article.title }}</h2>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articlePath = `/articles`
    // eslint-disable-next-line
    //console.log('articlePath', articlePath)
    const articles = await $content(articlePath, { deep: true })
      .only(['title', 'description', 'image', 'dir', 'slug', 'path'])
      .sortBy('date', 'desc')
      .fetch()
    // eslint-disable-next-line
    //console.log('articles', JSON.stringify(articles, null, 2))

    /*
     * Since we are using folders with an index.md file, we need to 'fix' the
     * slug here!
     */
    const fixArticleSlug = (article) => {
      // eslint-disable-next-line
      //console.log('Fixing article: ', JSON.stringify(article, null, 2))
      const fixedSlug = article.path.split('/').slice(-2)[0]
      return { ...article, slug: fixedSlug }
    }
    // eslint-disable-next-line
    //console.log('articles before map(): ', JSON.stringify(articles, null, 2))

    const articlesWithFixedSlug = articles.map(fixArticleSlug)

    // eslint-disable-next-line
    //console.log('articlesWithFixedSlug', JSON.stringify(articlesWithFixedSlug, null, 2))

    return {
      articles: articlesWithFixedSlug
    }
  }
}
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}

.article-card a {
  background-color: #fff;
  border-radius: 8px;
}

.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
