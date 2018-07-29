import React from 'react';
import PropTypes from 'prop-types'

const Dropdown = props => {
  return (
    <ul className={ props.isActive ? "search__results search__results--active": "search__results search__results--inactive" }>
      {
        props.searchedValues.length > 0 && props.isActive ?
          props.searchedValues.map( (result, index) =>
            props.name === "states" ?
              <li className="search__result" key={result.abbreviation} onMouseDown={ () => props.selectSearchedValue(props.index, result, result.name, props.plan, props.indices) } tabIndex="0">{ result.name }</li>:
              <li className="search__result" key={result.full_name + index} onMouseDown={ () => props.selectSearchedValue(props.index, result, result.full_name, props.plan, props.indices) } tabIndex="0"><span className="style--pluto-bold">{ result.name }</span> { result.strength + " " + result.strength_unit_of_measure + " " + result.dosage_form_name } </li>
          ):
          props.searchedValues.length === 0 && props.searchedValues.length < 3 && props.isActive && props.name === "drugs" ?
            <li className="search__result search__result--non-found">Enter at least three characters to search</li>:
            props.searchedValues.length === 0 && props.isActive ?
            <li className="search__result search__result--non-found">No matches found.</li>:
            null
      }
    </ul>
  );
}

Dropdown.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  plan: PropTypes.string.isRequired,
  searchedValues: PropTypes.array.isRequired,
  selectSearchedValue: PropTypes.func.isRequired,
};

export default Dropdown;
