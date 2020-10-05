<template>
  <img :src="imgSrc()" :alt="alt" />
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
      // eslint-disable-next-line
      console.log('dir: ', this.dir)
      // eslint-disable-next-line
      console.log('src: ', this.src)
      // eslint-disable-next-line
      console.log('alt: ', this.alt)
      try {
        return require(`~/content${this.dir}${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>
