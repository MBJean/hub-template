import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  return (
    <div className="Highlight__entry">
      <p><i>{props.annotation.lemma}</i></p>
      <div className="Highlight__text">
        {
          props.editing_old_active.is_active && props.editing_old_active.id == props.annotation.id ?
            <form onSubmit={ props.onSubmitEditedAnnotation }>
              <textarea className="Highlight__textarea" maxLength="1000" onChange={props.onChangeEditedAnnotation} value={props.editing_old_active.content}></textarea>
              <input type="submit" value="Submit"/>
            </form>:
            <p className="Highlight__content">{ props.annotation.content }</p>
        }
        <p className="Highlight__attribution">{ props.annotation.username }</p>
      </div>
      {
        props.section.current_user === props.annotation.user_id && !props.editing_additional_active.is_active && !props.editing_old_active.is_active ?
          <div className="Highlight__buttons">
            <button className="Highlight__button Highlight__add" onClick={ () => props.onClickAddAnnotation(props.annotation) }>Add</button>
            <button className="Highlight__button Highlight__edit" onClick={ () => props.onClickEditAnnotation(props.annotation) }>Edit</button>
            <button className="Highlight__button Highlight__delete" onClick={ () => props.onClickDeleteAnnotation(props.annotation.id) }>Delete</button>
          </div>:
          null
      }
      {
        props.editing_additional_active.is_active && props.editing_additional_active.id == props.annotation.id ?
          <div className="Highlight__editing">
            <p><b>Add new annotation</b></p>
            <form onSubmit={props.onSubmitAdditionalAnnotation}>
              <textarea className="Highlight__textarea" maxLength="1000" onChange={props.onChangeAnnotation} placeholder="Enter new annotation here" value={props.current_editing.content}></textarea>
              <input type="submit" value="Submit"/>
            </form>
          </div>:
          null
      }
    </div>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired,
  current_editing: PropTypes.object.isRequired,
  editing_additional_active: PropTypes.object.isRequired,
  editing_old_active: PropTypes.object.isRequired,
  onChangeAnnotation: PropTypes.func.isRequired,
  onChangeEditedAnnotation: PropTypes.func.isRequired,
  onClickAddAnnotation: PropTypes.func.isRequired,
  onClickDeleteAnnotation: PropTypes.func.isRequired,
  onClickEditAnnotation: PropTypes.func.isRequired,
  onSubmitAdditionalAnnotation: PropTypes.func.isRequired,
  onSubmitEditedAnnotation: PropTypes.func.isRequired,
  onSubmitNewAnnotation: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired
};

export default Annotation;
