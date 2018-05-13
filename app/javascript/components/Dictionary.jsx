import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dictionary extends Component {

  state = {
    current_search: "",
    revealed: false,
    results_defined: [],
    results_parsed: ""
  }

  currentSearchUpdate = (ev) => {
    this.setState({
      current_search: ev.target.value
    });
  }

  fetchDefined = (text) => {

    let self = this;

    // parse text as dom nodes for iteration
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text,"text/xml");
    let dom_lemmata = xmlDoc.getElementsByTagName("lemma");

    // prepare for second set of fetches by creating array of lemmata...
    let arr_lemmata = Array.from(dom_lemmata)
      // ...rendering as just lemma...
      .map( entry => entry.textContent )
      // ...and removing all non unique entries
      .filter( (value, index, self) => { return self.indexOf(value) === index; } );

    // create Promise with fetches all all lemma in arr_lemmata
    return Promise.all(arr_lemmata.map( (entry) => {
      return fetch("http://www.perseus.tufts.edu/hopper/xmlchunk?doc=Perseus%3Atext%3A1999.04.0059%3Aentry%3D" + entry)
        .then( res => res.ok ? res.text(): "PLACEHOLDER FOR FAILED FETCH" )
        .then( text => {
          return text;
        });
    } )).then(function(responses) {
      self.setState({
        results_defined: responses
      });
    });

  }

  fetchParsed = () => {
    fetch("http://www.perseus.tufts.edu/hopper/xmlmorph?lang=la&lookup=" + this.state.current_search)
      .then( res => res.text() )
      .then( text => {
        this.fetchDefined(text);
        this.setState({ results_parsed: text })
      });
  }

  renderXml = (string) => {
    return {__html: string};
  }

  revealDictionary = () => {
    this.setState({
      revealed: !this.state.revealed
    });
  }

  submit = (ev) => {
    ev.preventDefault();
    this.fetchParsed();
  }

  render() {

    return (
      <div className={ this.state.revealed ? "Dictionary Dictionary--active": "Dictionary Dictionary--inactive"}>
        <div className="Dictionary__container">
          <button
            className={ this.state.revealed ? "Dictionary__reveal Dictionary__reveal--bottom" : "Dictionary__reveal Dictionary__reveal--top"}
            onClick={ this.revealDictionary }
          >
            {
              this.state.revealed ?
                <span className="Dictionary__icon">&#x2716;</span>:
                <span className="Dictionary__icon">&#x270E;</span>
            }
          </button>

          <p>Search for a Latin word</p>

          <form className="Dictionary__form" onSubmit={ this.submit }>
            <input
              onChange={ this.currentSearchUpdate }
              value={ this.state.current_search }
            />

            <input type="submit" />
          </form>

          <div className="Dictionary__parsed" dangerouslySetInnerHTML={ this.renderXml(this.state.results_parsed) }></div>

          <div className="Dictionary__defined" dangerouslySetInnerHTML={ this.renderXml(this.state.results_defined) }></div>
        </div>
      </div>
    )
  }
}
