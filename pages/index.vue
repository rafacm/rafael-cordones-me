<template>
  <div class="m-8">
    <TheHeader />
    <ul class="flex flex-wrap">
      <li
        v-for="article of articlesWithFixedSlug"
        :key="article.slug"
        class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"
      >
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
        >
          <content-image
            class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
            :dir="article.dir"
            :src="article.image.path"
            :alt="article.image.alt"
          />

          <div
            class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
          >
            <h2 class="font-bold">{{ article.title }}</h2>
            <p class="font-bold text-gray-600 text-sm">
              {{ article.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <footer class="flex justify-center border-gray-500 border-t-2">
      <p class="mt-4">
        Created by
        <a
          href="https://twitter.com/debs_obrien"
          class="font-bold hover:underline"
          >Debbie O'Brien</a
        >
        at NuxtJS. See the
        <a
          href="https://nuxtjs.org/blog/creating-blog-with-nuxt-content"
          class="font-bold hover:underline"
          >tutorial</a
        >
        for how to build it.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articlePath = `/articles`
    // eslint-disable-next-line
    console.log('articlePath', articlePath)
    const articles = await $content(articlePath, { deep: true })
      .only(['title', 'description', 'image', 'dir', 'slug'])
      .sortBy('date', 'desc')
      .fetch()
    // eslint-disable-next-line
    console.log('articles', JSON.stringify(articles, null, 2))

    return {
      articles
    }
  },
  computed: {
    // eslint-disable-next-line
    articlesWithFixedSlug: function() {
      /*
       * Since we are using folders with an index.md file, we need to 'fix' the
       * slug here!
       */
      const fixArticleSlug = (article) => {
        const fixedSlug = article.path.split('/').slice(-2)[0]
        return { ...article, slug: fixedSlug }
      }
      const articlesWithFixedSlug = this.articles.map(fixArticleSlug)
      // eslint-disable-next-line
      console.log('articlesWithFixedSlug', JSON.stringify(articlesWithFixedSlug, null, 2))

      return articlesWithFixedSlug
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
