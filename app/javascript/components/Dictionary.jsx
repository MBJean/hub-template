import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities';
import createPostBody from '../helpers/createPostBody';
import renderUnsafeXml from '../helpers/renderUnsafeXml';
import fetchArray from '../helpers/fetchArray';
import parseXml from '../helpers/parseXml';

export default class Dictionary extends Component {

  state = {
    current_search: "",
    revealed: false,
    results_defined: [],
    results_parsed: ""
  }

  currentSearchUpdate = (ev) => {
    this.setState({ current_search: ev.target.value });
  }

  fetchDefined = (xml_string) => {
    let self = this;
    // parse XML string as dom nodes so we can extract specific nodes (in this case, a node named "lemma")
    let dom_lemmata = parseXml(xml_string, "lemma");
    // prepare to fetch all lemmata against /dictionary by creating array of lemmata (plural of lemma), rerendering as just lemmata, and removing all non-unique entries
    let arr_lemmata = Array.from(dom_lemmata)
      .map( entry => entry.textContent )
      .filter( (value, index, self) => self.indexOf(value) === index );
    // create array of JSON objects out of db calls using array of lemmata from above
    return Promise.all(fetchArray(arr_lemmata))
    .then( responses => self.setState({ results_defined: responses }) );
  }

  fetchParsed = () => {
    fetch("http://www.perseus.tufts.edu/hopper/xmlmorph?lang=la&lookup=" + this.state.current_search)
      .then( res => res.text() )
      .then( text => {
        this.fetchDefined(text);
        this.setState({ results_parsed: text })
      });
  }

  revealDictionary = () => {
    this.setState({ revealed: !this.state.revealed });
  }

  submit = (ev) => {
    ev.preventDefault();
    this.fetchParsed();
  }

  render() {

    return (
      <div className={ this.state.revealed ? "Dictionary Dictionary--active": "Dictionary Dictionary--inactive"}>
        <div className="Dictionary__container">

          <button className={ this.state.revealed ? "Dictionary__reveal Dictionary__reveal--bottom" : "Dictionary__reveal Dictionary__reveal--top"} onClick={ this.revealDictionary } >
            {
              this.state.revealed ?
                <span className="Dictionary__icon">&#x2716;</span>:
                <span className="Dictionary__icon">&#x270E;</span>
            }
          </button>

          <p>Search for a Latin word</p>
          <p>Powered by <a href="http://www.perseus.tufts.edu/hopper/" target="blank">The Perseus Project</a></p>

          <form className="Dictionary__form" onSubmit={ this.submit }>
            <input onChange={ this.currentSearchUpdate } value={ this.state.current_search } />
            <input type="submit" />
          </form>

          <div className="Dictionary__parsed" dangerouslySetInnerHTML={ renderUnsafeXml(this.state.results_parsed) }></div>

          {
            this.state.results_defined.map( entry =>
              <div className="Dictionary__defined" dangerouslySetInnerHTML={ renderUnsafeXml(convertEntities(entry.description)) } key={entry.id} />
            )
          }

        </div>
      </div>
    )
  }
}
