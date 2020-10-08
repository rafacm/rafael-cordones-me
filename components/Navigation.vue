<template>
  <nav
    class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="">
          <h1
            class="text-2xl text-gray-600 tracking-wider font-bold hover:text-primary-500"
          >
            <nuxt-link to="/">rafael cordones</nuxt-link>
          </h1>
        </div>
        <div class="lg:w-1/5 flex pl-8 justify-items-end">
          <div class="flex justify-items-end">
            <a
              v-for="link in socialLinks"
              :key="link.title"
              :href="link.url"
              target="_blank"
              :title="link.title"
              :name="link.title"
              class="text-gray-600 hover:text-primary-500 ml-4 text-2xl"
            >
              <font-awesome-icon :icon="['fab', link.icon]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    socialLinks() {
      return [
        {
          title: 'Twitter',
          icon: 'twitter',
          url: 'https://twitter.com/rafacm'
        },
        {
          title: 'Github',
          icon: 'github',
          url: 'https://github.com/rafacm'
        },
        {
          title: 'LinkedIn',
          icon: 'linkedin',
          url: 'https://www.linkedin.com/in/rafaelcordones/'
        }
      ]
    }
  }
}
</script>
