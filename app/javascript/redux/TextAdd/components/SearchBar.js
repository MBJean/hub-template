import React from 'react';
import PropTypes from 'prop-types'
import Dropdown from './Dropdown';

const SearchBar = props => {
  return (
    <label id="SearchFormLibrary__search-state" className="SearchFormInput search__container spacer__bottom--xs-medium">
      <input
        autoComplete="off"
        className="search__input search__input--drug search__input--active"
        name={props.name}
        onBlur={ (ev) => { props.toggleFocus(props.index, false); }}
        onChange={ (ev) => {
          props.updateValue(props.index, ev.target.value);
          props.fetch(props.index, props.name, {value: ev.target.value}, props.indices);
        }}
        onFocus={ (ev) => { props.toggleFocus(props.index, true); }}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
      />
      {
        props.isError ?
          <p className="search__error-message">{props.errorMessage}</p>:
          null
      }
      <Dropdown {...props} />
      <svg
        aria-hidden="true"
        className={
          props.isError ?
            "svg__arrow search__arrow search__arrow--active":
            "svg__arrow search__arrow search__arrow--inactive"
        }
        height="22"
        preserveAspectRatio="xMidYMin slice"
        width="22"
        viewBox="0 0 22 22">
        <path
          className="svg__line--magenta svg__fill--transparent"
          d="M7 7 L 15 15 M15 7 L 7 15"
          strokeLinecap="round"
          strokeWidth="2" />
      </svg>
    </label>
  );
}

SearchBar.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  searchedValues: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  selectSearchedValue: PropTypes.func.isRequired,
  toggleFocus: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
