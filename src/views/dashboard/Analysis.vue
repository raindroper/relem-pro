<template>
  <h1 @click="test">Analysis</h1>
</template>

<script>
export default {
  name: 'Analysis',
  methods: {
    test () {
      this.$confirm('a')
    }
  }
}
</script>

<style scoped>

</style>
