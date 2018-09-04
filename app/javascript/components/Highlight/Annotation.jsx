import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  console.log(props.annotation);
  return (
    <div className="Highlight__entry">
      <p><i>{props.annotation.lemma}</i></p>
      <div className="Highlight__text">
        <p className="Highlight__content">{ props.annotation.content }</p>
        <p className="Highlight__attribution">{ props.annotation.username }</p>
      </div>
      <div className="Highlight__buttons">
        <button className="Highlight__button Highlight__add">Add</button>
        <button className="Highlight__button Highlight__edit">Edit</button>
        <button className="Highlight__button Highlight__delete">Delete</button>
      </div>
    </div>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired
};

export default Annotation;
