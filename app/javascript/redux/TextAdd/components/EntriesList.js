import React, { Component } from 'react';
import SelectableEntry from "./SelectableEntry";

export default class EntriesList extends Component {
  state = {
    revealMore: false
  }
  showMore = () => {
    this.setState({ revealMore: true });
  }
  render() {
    return (
      <div>
        <ul className="SearchFormEntries search__entries style--center-xs">
          {
            this.props.isError ?
              <li className="search__entry--error" onClick={ () => { this.props.initiateFullReset(this.props.plan, this.props.indices) } } tabIndex="0">
                <div className="search__text">
                  <p className="search__title">We apologize!</p>
                  <p className="search__description">It looks like an error has occurred. Please click here or refresh your browser to try again.</p>
                </div>
              </li>:
              this.props.searchedValues.map( (entry, index) => {
                return (
                  <SelectableEntry
                    {...this.props}
                    data={entry}
                    formIndex={index}
                    key={ entry.description + index }
                    index={ this.props.index }
                    strClass={
                      this.props.strClass
                      + " "
                      + ((index <= 2 || this.state.revealMore) ? "search__entry--visible": "search__entry--invisible")
                      + " "
                      + (entry.score > 18.2348125190735 ? "search__entry--with-banner": "search__entry--without-banner")
                    }
                    />
                );
              })
          }
        </ul>
        {
          (!this.state.revealMore && this.props.isActive && !this.props.isError && this.props.searchedValues.length > 3) ?
            <div className="search__show-more">
              <svg className="search__svg" height="20" preserveAspectRatio="xMidYMin slice" width="20" viewBox="0 0 20 20">
                <circle className="svg__fill--magenta" cx="10" cy="10" r="9"/>
                <path className="svg__line--white" d="M10 6 L 10 14 M6 10 L 14 10" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <button className="search__button" onClick={this.showMore}>Show { this.props.searchedValues.length - 3} more result</button>
            </div>
            : null
        }
      </div>
    );
  }
}
