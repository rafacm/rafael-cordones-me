<template>
  <nav
    class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="">
          <h1 class="text-2xl">
            <nuxt-link to="/">rafael cordones</nuxt-link>
          </h1>
        </div>
        <div class="lg:w-1/5 flex pl-8 justify-items-end">
          <div class="flex justify-items-end">
            <a
              href="https://twitter.com/rafacm"
              target="_blank"
              title="Twitter"
              name="Twitter"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4"
            >
              <IconTwitter class="w-5 h-5" />
            </a>
            <a
              href="https://github.com/rafacm"
              target="_blank"
              title="Github"
              name="Github"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark-hover:text-primary-500 ml-4"
            >
              <IconGithub class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
