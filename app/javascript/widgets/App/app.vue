<template>

  <div class="app"
    :class="{
      'app--open-left': dictionary.open,
      'app--open-right': test.open
      }"
  >
    <aside class="app__sidebar-left">
      <template v-if="dictionary.open">
        <Dictionary @closeDictionary="closeDictionary" />
      </template>
      <template v-else>
        <nav>
          <ul class="nav__list">
            <li @click="openDictionary">
              <i class="material-icons">search</i>
            </li>
          </ul>
        </nav>
      </template>
    </aside>
    <div class="app__body">
      <h1>Welcome to the Latin Learning Hub</h1>
      <div v-for="line in text" class="app__line">
        <span>{{ line.line_number }}</span>
        <span>{{ line.content }}</span>
      </div>
    </div>
    <div class="app__sidebar-right">
      <ul class="nav__list">
        <li @click="openTest">Test</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Dictionary from './dictionary.vue';
  export default {
    data() {
      return {
        dictionary: {
          open: false
        },
        test: {
          open: false
        },
        text: null,
        results_defined: [],
        results_parsed: "",
        search_value: ""
      }
    },
    created() {
      this.textLines();
    },
    methods: {
      closeDictionary() {
        this.dictionary.open = false;
      },
      parseText(json) {
        this.text = json.lines.sort( (a, b) => a.line_number < b.line_number ? 1: -1);
      },
      openDictionary() {
        this.test.open = false;
        this.dictionary.open = !this.dictionary.open;
      },
      openTest() {
        this.dictionary.open = false;
        this.test.open = !this.test.open;
      },
      textLines() {
        fetch("./api/v1/text_lookup/ovid/metamorphoses/1/")
          .then(res => res.json()).then(json => this.parseText(json))
          .catch(error => console.log('Error: ' + error));
      }
    },
    components: { Dictionary }
  }
</script>

<style lang="scss" scoped>
  .app {
    display: flex;
    margin-top: 5rem;
    height: calc(100vh - 12rem);
    .app__sidebar-left,
    .app__sidebar-right {
      overflow-y: hidden;
      transition: width 0.3s ease;
    }
    .app__sidebar-left { width: 3rem; }
    .app__body { width: calc(100% - 6rem); }
    .app__sidebar-right { width: 3rem; }
  }
  .app--open-left {
    .app__sidebar-left { width: 40%; }
    .app__body { width: 50%; }
    .app__sidebar-right { width: 10%; }
  }
  .app--open-right {
    .app__sidebar-left { width: 10%; }
    .app__body { width: 50%; }
    .app__sidebar-right { width: 40%; }
  }
  .app__sidebar-left,
  .app__body {
    border-right: 2px solid black;
  }
  .app__sidebar-left,
  .app__sidebar-right {
    position: relative;
  }
  .app__sidebar-left::after,
  .app__sidebar-right::after {
    content  : "";
    position : absolute;
    z-index  : 1;
    bottom   : 0;
    left     : 0;
    pointer-events   : none;
    background-image : linear-gradient(to bottom,
                      rgba(255,255,255, 0),
                      rgba(255,255,255, 1) 50%);
    width    : 100%;
    height   : 4em;
  }
  .app__body {
    overflow-y: scroll;
    padding: 2rem 1rem;
  }
  .app__line {
    display: flex;
    > :first-child {
      margin-right: 1rem;
    }
  }
  .nav__list {
    list-style: none;
    padding: 0;
  }
</style>
