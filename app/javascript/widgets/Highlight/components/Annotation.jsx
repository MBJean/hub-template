import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
    return (
    <div className="Highlight__entry">
      <div className="Highlight__text">
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
            <p className="Highlight__content">{ props.annotation.content }</p>
        }
        <p className="Highlight__attribution">{ props.annotation.username }</p>
      </div>
      {
        props.section_data.current_user === props.annotation.user_id ?
          <div className="Highlight__buttons">
            <button className="Highlight__button Highlight__edit" onClick={ () => props.onClickEdit(props.annotation) } >Edit</button>
            <button className="Highlight__button Highlight__delete" onClick={ () => props.onClickDelete(props.annotation.id) }>Delete</button>
          </div>:
          null
      }
    </div>
  )
}

Annotation.propTypes = {
  annotation: PropTypes.object.isRequired,
  annotation_data: PropTypes.object.isRequired,
  onChangeActiveAnnotation: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onSubmitEditedAnnotation: PropTypes.func.isRequired,
  section_data: PropTypes.object.isRequired
};

export default Annotation;
