<template>
  <div class="w-full mx-auto">
    <div class="mb-4">
      <h1 class="text-2xl xl:text-4xl font-bold">{{ article.title }}</h1>
      <h2 class="uppercase tracking-wider my-2 text-lg xl:text-xl">
        {{ formatDate(article.date) }}
      </h2>
      <div class="my-2 flex flex-row flex-wrap justify-start mb-2">
        <div v-for="tag of article.tags" :key="tag">
          <span
            class="rounded-full border px-2 py-1 mr-2 mb-2 text-sm bg-gray-200 tracking-wider"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <article class="prose max-w-none lg:prose-lg xl:prose-xl">
      <figure class="w-full">
        <content-image
          class="rounded shadow-lg"
          :dir="article.dir"
          :src="article.image.path"
          :alt="article.image.alt"
        />
        <!-- eslint-disable-next-line -->
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
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>
