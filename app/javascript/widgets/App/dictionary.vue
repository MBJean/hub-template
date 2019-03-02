<template>
  <div class="Dictionary">
    <button class="Dictionary__close" @click="$emit('closeDictionary')">
      <i class="material-icons">close</i>
    </button>
    <h2 class="Dictionary__title">Dictionary</h2>
    <form v-on:submit="onSubmit" class="Dictionary__form">
      <label>
        <p class="Dictionary__subtitle">Search for a Latin word:</p>
        <input type="text" value="" v-model="search_value" />
      </label>
      <div class="Dictionary__buttons">
        <input type="submit" value="Search" />
      </div>
    </form>
    <h3 class="Dictionary__entry-title">Possible parsed formations</h3>
    <div v-html="results_parsed" class="Dictionary__parsed" />
    <h3 class="Dictionary__entry-title">Lexicon entries</h3>
    <ul class="Dictionary__list">
      <li class="Dictionary__entry" v-for="result in results_defined">
        <div v-html="result.description" />
      </li>
    </ul>
  </div>
</template>

<script>
  import convertEntities from '../../helpers/convertEntities';
  import createPostBody from '../../helpers/createPostBody';
  import fetchArray from '../../helpers/fetchArray';
  import parseXml from '../../helpers/parseXml';
  import Entry from './entry.vue';
  export default {
    data() {
      return {
        results_defined: [],
        results_parsed: "",
        search_value: ""
      }
    },
    methods: {
      errorHandler: function(error) {
        console.log(error);
      },
      onSubmit: function(ev) {
        ev.preventDefault();
        this.fetchParsed(this.search_value);
      },
      fetchDefined: function(xml) {
        let self = this;
        // parse XML string as dom nodes so we can extract specific nodes (in this case, a node named "lemma")
        let dom_lemmata = parseXml(xml, "lemma");
        // prepare to fetch all lemmata against /dictionary by creating array of lemmata (plural of lemma), rerendering as just lemmata, and removing all non-unique entries
        let arr_lemmata = Array.from(dom_lemmata)
          .map( entry => entry.textContent )
          .filter( (value, index, self) => self.indexOf(value) === index );
        // create array of JSON objects out of db calls using array of lemmata from above
        return Promise.all(fetchArray(arr_lemmata))
          .then( responses => this.results_defined = responses.filter( result => result.id !== null ) )
          .catch( err => this.errorHandler(err) );
      },
      fetchParsed: function(search_value) {
        fetch(`http://www.perseus.tufts.edu/hopper/xmlmorph?lang=la&lookup=${this.search_value}`)
        .then( res => res.text() )
        .then( text => {
          this.fetchDefined(text);
          this.results_parsed = text;
        })
        .catch( err => this.errorHandler(err) );
      }
    },
    components: { Entry }
  }
</script>

<style>
  analyses {
    box-sizing: border-box;
    display: block;
  }
  analyses analysis {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.25em;
  }
  analyses analysis:last-child {
    margin-bottom: 0;
  }
  analyses analysis expandedForm,
  analyses analysis form {
    display: none;
  }
  analyses analysis > * {
    flex-basis: 1;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
  sense {
    display: block;
    margin: 0.5rem 0;
  }
  sense[level="2"] {
    margin-left: 0.5em;
  }
  sense[level="3"] {
    margin-left: 1em;
  }
  sense[level="4"] {
    margin-left: 1.5em;
  }
  sense[level="5"] {
    margin-left: 2em;
  }
  sense[level="6"] {
    margin-left: 2.5em;
  }
  hi[rend="ital"], bibl, quote, author {
    font-weight: normal;
  }
  hi[rend="ital"] {
    font-weight: bold;
  }
  quote {
    color: #181818;
  }
  author {
    color: #303030;
  }
  bibl {
    color: #606060;
  }
  cit {
    font-family: 'Times New Roman', serif;
    font-style: italic;
  }
  entryFree {
    display: block;
    font-family: Georgia, serif;
    letter-spacing: 0.1px;
    width: 100%;
  }
  entryFree:last-child {
    border-bottom: none;
  }
</style>

<style lang="scss" scoped>
  .Dictionary {
    max-height: 100%;
    overflow-y: scroll;
    padding: 2rem 1rem;
    position: relative;
  }
  .Dictionary__form,
  .Dictionary__parsed { margin-bottom: 4em; }

  .Dictionary__title { font-size: 1.5em; }
  .Dictionary__subtitle {
    font-weight: bold;
    font-size: 1.25em;
  }
  .Dictionary__buttons {
    text-align: right;
    width: 100%;
  }
  .Dictionary__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .Dictionary__close {
    appearance: none;
    background-color: transparent;
    border: 0;
    color: #9d202e;
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    top: 1rem; right: 1rem;
  }
  .Dictionary__entry-title {
    color: #37645b;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  .Dictionary__entry {
    font-size: 1rem;
    margin-bottom: 2em;
  }
</style>
