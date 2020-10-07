<template>
  <div
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/3 xs:w-full xs:h-84 lg:h-full post-left">
      <content-image
        class="absolute h-full w-full object-cover"
        :dir="article.dir"
        :src="article.image.path"
        :alt="article.image.alt"
      />
      <div class="overlay"></div>
      <div class="absolute mt-4 mr-4 top-32 left-32 text-white">
        <NuxtLink to="/"><Logo /></NuxtLink>
      </div>
    </div>
    <article
      class="prose relative xs:py-4 xs:px-8 lg:py-8 lg:px-16 lg:w-2/3 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <h1 class="text-4xl font-bold">{{ article.title }}</h1>
      <h3 class="mt-2 -mb-3 flex uppercase text-sm">
        {{ formatDate(article.date) }}
      </h3>
      <nuxt-content :document="article" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </article>
  </div>
</template>
<script>
import ContentImage from '@/components/global/ContentImage'
export default {
  components: { ContentImage },
  scrollToTop: true,
  async asyncData({ $content, error, params }) {
    try {
      const articlePath = `/articles/${params.slug}`
      // eslint-disable-next-line
      //console.log('articlePath', articlePath)
      const articles = await $content(articlePath, { deep: true }).fetch()
      const article = articles[0]
      // eslint-disable-next-line
      //console.log('article', JSON.stringify(article, null, 2))
      const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()
      return {
        article,
        prev,
        next
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Article could not be found'
      })
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
