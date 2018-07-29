import React from 'react';
import PropTypes from 'prop-types';

const SelectableEntry = props => {
  return (
    <li
      className={ props.strClass }
      onClick={ () => { props.selectForm(props.index, props.data, props.plan, props.indices, props.formIndex); } }
      tabIndex="0"
    >
      <img alt={ props.data.description + "Prior Authorization Form" } className="search__image" src={ props.data.thumbnail_url } />
      <div className="search__text">
        <p className="search__title">{ props.data.description }</p>
        <p className="search__description">{ props.data.directions }</p>
      </div>
    </li>
  );
}

SelectableEntry.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  selectForm: PropTypes.func.isRequired,
  strClass: PropTypes.string.isRequired,
};

export default SelectableEntry;
