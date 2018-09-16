<template>
  <div>
    <h2>Latin Dictionary</h2>
    <form v-on:submit="onSubmit">
      <label>
        Search for a Latin word:
        <input type="text" value="" v-model="search_value" />
      </label>
      <input type="submit" value="Search" />
    </form>
    <ul>
      <entry
        v-for="result in results_defined"
        v-bind:result="result"
        v-bind:key="">
      </entry>
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

<style scoped>
</style>
