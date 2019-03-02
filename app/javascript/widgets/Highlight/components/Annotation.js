import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  return (
    <li className="Highlight__entry">
      <div className="Highlight__content">
        {
          props.annotation_data.active_type === "edit" && props.annotation_data.active_annotation.id == props.annotation.id ?
            <form onSubmit={ (ev) => props.onSubmitEditedAnnotation(ev, props.annotation.id, props.value) }>
              <textarea
                className="Highlight__textarea"
                maxLength="1000"
                onChange={ (ev) => props.updateValue(ev) }
                value={props.value}>
              </textarea>
              <input type="submit" value="Submit"/>
            </form>:
            <p className="Highlight__annotation-text">{ props.annotation.content }</p>
        }
        <p className="Highlight__username">{ props.annotation.username }</p>
      </div>
      {
        props.section_data.current_user === props.annotation.user_id ?
          <div className="mdc-card__action-icons">
            <button className="button--secondary" onClick={ () => props.onClickEdit(props.annotation) } >Edit</button>
            <button className="button--primary" onClick={ () => props.onClickDelete(props.annotation.id) }>Delete</button>
          </div>:
          null
      }
    </li>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired,
  annotation_data: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onSubmitEditedAnnotation: PropTypes.func.isRequired,
  section_data: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired
};

export default Annotation;
