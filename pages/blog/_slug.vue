<template>
  <article
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <content-image
        class="absolute h-full w-full object-cover"
        :dir="article.dir"
        :src="article.image.path"
        :alt="article.image.alt"
      />
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-white">
        <NuxtLink to="/"><Logo /></NuxtLink>
        <div class="mt-16 -mb-3 flex uppercase text-sm">
          <p class="mr-3">
            {{ formatDate(article.date) }}
          </p>
        </div>
        <h1 class="text-6xl font-bold">{{ article.title }}</h1>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <nuxt-content :document="article" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
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
      console.log('articlePath', articlePath)
      const articles = await $content(articlePath, { deep: true }).fetch()
      const article = articles[0]
      // eslint-disable-next-line
      console.log('article', JSON.stringify(article, null, 2))
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
<style>
.nuxt-content p {
  margin-bottom: 20px;
}
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
