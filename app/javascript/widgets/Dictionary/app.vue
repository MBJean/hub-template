<template>
  <div class="Dictionary">
    <div class="Dictionary__container">
      <button class="Dictionary__close" id="button__deactivate-dictionary">&#215;</button>
      <h2 class="Dictionary__title">Latin Dictionary</h2>
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
      <div v-html="results_parsed" class="Dictionary__parsed">
      </div>
      <h3 class="Dictionary__entry-title">Lexicon entries</h3>
      <ul class="Dictionary__list">
        <entry
          v-for="result in results_defined"
          v-bind:result="result"
          v-bind:key=""
          v-bind:testFunction="testFunction">
        </entry>
      </ul>
    </div>
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
      },
      testFunction: function() {
        console.log('this is a test');
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
    border-left: 4px solid #37645b;
    box-sizing: border-box;
    display: block;
    margin-bottom: 0.25em;
    padding-left: 3em;
  }
  analyses analysis:last-child {
    margin-bottom: 0;
  }
  analyses analysis expandedForm,
  analyses analysis form {
    display: none;
  }
  analyses analysis * {
    margin-right: 1rem;
  }
</style>

<style scoped>
  .Dictionary {
    background-color: white;
    border-right: 2px solid #1b161e;
    font-size: 1rem;
    height: 100vh;
    left: 0;
    max-width: 80vw;
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.79, 0.04, 0, 1.01);
    width: 450px;
    z-index: 10;
  }
  .Dictionary--active {
    transform: translateX(0);
  }
  .Dictionary__container {
    height: 100%;
    overflow-y: scroll;
    padding: 4em 1em;
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
  .Dictionary__container:after {
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
    margin: 0 0 0 3rem;
    text-transform: uppercase;
  }
</style>
