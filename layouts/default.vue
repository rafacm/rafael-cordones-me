<template>
  <div class="pt-16">
    <Header />
    <main class="container mx-auto mt-4 px-4 lg:px-8">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components: { Footer, Header }
}
</script>
