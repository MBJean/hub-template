import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities'

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

    return Promise.all(arr_lemmata.map( (entry) => {
      return fetch("/dictionary", {
        body: JSON.stringify({"input": entry}), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          'X-CSRF-Token': self.getMeta()
        },
        method: 'POST', // *GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
      })
        .then( res => res.json() )
        .then( json => {
          return json;
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

  getMeta() {
    let metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") == "csrf-token") {
        return metas[i].getAttribute("content");
      }
    }
    return "";
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
          <p>Powered by <a href="http://www.perseus.tufts.edu/hopper/" target="blank">The Perseus Project</a></p>

          <form className="Dictionary__form" onSubmit={ this.submit }>
            <input
              onChange={ this.currentSearchUpdate }
              value={ this.state.current_search }
            />

            <input type="submit" />
          </form>

          <div className="Dictionary__parsed" dangerouslySetInnerHTML={ this.renderXml(this.state.results_parsed) }></div>

          { this.state.results_defined.map( entry => <div className="Dictionary__defined" dangerouslySetInnerHTML={ this.renderXml(convertEntities(entry.description)) } key={entry.id}></div>)}
        </div>
      </div>
    )
  }
}
