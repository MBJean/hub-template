import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  return (
    <li className="Highlight__entry mdc-card">
      <div className="Highlight__content">
        {
          props.annotation_data.active_type === "edit" && props.annotation_data.active_annotation.id == props.annotation.id ?
            <form onSubmit={ (ev) => props.onSubmitEditedAnnotation(ev, props.annotation.id, props.annotation_data.active_value) }>
              <textarea
                className="Highlight__textarea"
                maxLength="1000"
                onChange={ (ev) => props.onChangeActiveAnnotation(ev.target.value) }
                value={props.annotation_data.active_value}>
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
            <button className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" onClick={ () => props.onClickEdit(props.annotation) } >edit</button>
            <button className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" onClick={ () => props.onClickDelete(props.annotation.id) }>delete</button>
          </div>:
          null
      }
    </li>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired,
  annotation_data: PropTypes.object.isRequired,
  onChangeActiveAnnotation: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onSubmitEditedAnnotation: PropTypes.func.isRequired,
  section_data: PropTypes.object.isRequired
};

export default Annotation;
