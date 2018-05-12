import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dictionary extends Component {

  state = {
    current_search: "",
    revealed: false,
    results: ""
  }

  currentSearchUpdate = (ev) => {
    this.setState({
      current_search: ev.target.value
    });
  }

  revealDictionary = () => {
    this.setState({
      revealed: !this.state.revealed
    });
  }

  submit = () => {
  }

  render() {
    return (
      <div className={ this.state.revealed ? "Dictionary Dictionary--active": "Dictionary Dictionary--inactive"}>

        <button
          className={ this.state.revealed ? "Dictionary__reveal Dictionary__reveal--bottom" : "Dictionary__reveal Dictionary__reveal--top"}
          onClick={ this.revealDictionary }
        >
          Toggle dictionary
        </button>

        <p>Search for a Latin word</p>

        <input
          onChange={this.currentSearchUpdate}
          value={this.state.current_search}
        />

        <input
          onSubmit={this.submit}
          type="submit"
        />

        <div>
          { this.state.results }
        </div>

      </div>
    )
  }
}
