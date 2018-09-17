<template>
  <li class="Dictionary__entry" v-html="result.description"></li>
</template>

<script>
  export default {
    props: [
      'result',
      'testFunction'
    ]
  }
</script>

<style>
  sense {
    display: block;
    margin: $spacer-tiny 0;
  }

  sense[level="2"] { margin-left: 0.5em; }
  sense[level="3"] { margin-left: 1em; }
  sense[level="4"] { margin-left: 1.5em; }
  sense[level="5"] { margin-left: 2em; }
  sense[level="6"] { margin-left: 2.5em; }

  hi[rend="ital"], bibl, quote, author { font-weight: normal; }
  hi[rend="ital"] { font-weight: bold; }

  quote { color: $dark-grey; }
  author { color: $medium-grey; }
  bibl { color: $light-grey; }

  cit {
    font-family: $font-tnr;
    font-style: italic;
  }

  entryFree {
    display: block;
    font-family: $font-georgia;
    letter-spacing: 0.1px;
    width: 100%;
  }

  entryFree:last-child { border-bottom: none; }

</style>

<style scoped>
  .Dictionary__entry {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 2rem 3em;
    margin-bottom: 2em;
  }
</style>
