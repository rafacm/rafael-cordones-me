<template>
  <img :srcset="imgSrc().srcSet" :alt="alt" />
</template>

<script>
export default {
  props: {
    dir: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  methods: {
    imgSrc() {
      try {
        return require(`~/content${this.dir}${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
