<template>
  <li v-html="result.description"></li>
</template>

<script>
  export default {
    props: ['result']
  }
</script>

<style scoped>
</style>
