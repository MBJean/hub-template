<template>
  <li class="Dictionary__entry" v-bind:class="{ 'Dictionary__entry--active': is_open }">
    <div v-on:click="toggleEntry" v-html="result.description"></div>
  </li>
</template>

<script>
  export default {
    data() {
      return {
        is_open: false
      }
    },
    props: [
      'result',
      'testFunction'
    ],
    methods: {
      toggleEntry: function() {
        this.is_open = !this.is_open;
      }
    }
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
    cursor: zoom-in;
    font-size: 1rem;
    height: 200px;
    padding: 2em 3em 5em;
    margin-bottom: 2em;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .Dictionary__entry--active {
    background-color: #FFFFFF;
    box-shadow: none;
    cursor: zoom-out;
    height: 100vh;
    margin-bottom: 0;
    max-height: 100%;
    overflow: scroll;
    position: absolute;
    top: 0; left: 0;
    width: 100%;
  }
</style>
