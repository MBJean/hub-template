import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  return (
    <div className="Highlight__entry">
      <p><i>{props.annotation.lemma}</i></p>
      <div className="Highlight__text">
        <p className="Highlight__content">{ props.annotation.content }</p>
        <p className="Highlight__attribution">{ props.annotation.username }</p>
      </div>
      {
        props.section.current_user === props.annotation.user_id ?
          <div className="Highlight__buttons">
            <button className="Highlight__button Highlight__add">Add</button>
            <button className="Highlight__button Highlight__edit">Edit</button>
            <button className="Highlight__button Highlight__delete" onClick={ () => props.onClickDeleteAnnotation(props.annotation.id) }>Delete</button>
          </div>:
          null
      }
    </div>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired,
  onClickDeleteAnnotation: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired
};

export default Annotation;
