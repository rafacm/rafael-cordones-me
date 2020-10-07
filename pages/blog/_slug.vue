<template>
  <div class="w-full mx-auto">
    <article class="prose max-w-none lg:prose-lg xl:prose-xl">
      <h1 class="text-4xl font-bold">{{ article.title }}</h1>
      <h3 class="mt-2 -mb-3 flex uppercase text-sm">
        {{ formatDate(article.date) }}
      </h3>
      <figure>
        <content-image
          class="w-full"
          :dir="article.dir"
          :src="article.image.path"
          :alt="article.image.alt"
        />
        <figcaption v-html="article.image.caption"></figcaption>
      </figure>
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
