import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Annotation from './Annotation';

const Annotations = props => {
  return (
    <div className="Highlight__annotations">
      <div className="Highlight__header">
        {
          props.page_data.annotations.active_annotations.length > 0 ?
            <p><i className="Highlight__lemma">{props.page_data.annotations.active_annotations[0].lemma}</i></p>:
            null
        }
      </div>
    {
      props.page_data.annotations.active_type === "add" ?
        <div className="Highlight__add">
          <p><b>Add new annotation</b></p>
          <form onSubmit={ (ev) => props.onSubmitNewAnnotation(ev, { annotation: props.page_data.annotations.active_annotations[0], value: props.page_data.annotations.active_value }) }>
            <textarea
              className="Highlight__textarea"
              maxLength="1000"
              onChange={ (ev) => props.onChangeActiveAnnotation(ev.target.value) }
              placeholder="Enter additional annotation here"
              value={props.page_data.annotations.active_value}>
            </textarea>
            <input type="submit" value="Submit"/>
          </form>
        </div>:
        null
    }
    <ul className="Highlight__list">
      {
        props.page_data.annotations.active_annotations.map( annotation => (
          <Annotation
            annotation={annotation}
            annotation_data={props.page_data.annotations}
            onChangeActiveAnnotation={props.onChangeActiveAnnotation}
            onClickDelete={props.onClickDelete}
            onClickEdit={props.onClickEdit}
            onSubmitEditedAnnotation={props.onSubmitEditedAnnotation}
            section_data={props.page_data.section}
            key={`annotations-${annotation.id}-${annotation.start_index}`}
            />
        ))
      }
    </ul>
    {
      props.page_data.annotations.active_type === "new" ?
        <div className="Highlight__editing">
          <p><b>Add new annotation</b></p>
          <ul className="Highlight__list">
            <li>Lines(s): {`${props.page_data.annotations.active_annotation.line}`}</li>
            <li>Lemma: <i>{`${props.page_data.annotations.active_annotation.lemma}`}</i></li>
          </ul>
          <form onSubmit={ (ev) => props.onSubmitNewAnnotation(ev, { annotation: props.page_data.annotations.active_annotation, value: props.page_data.annotations.active_value }) }>
            <textarea
              className="Highlight__textarea"
              maxLength="1000"
              onChange={ (ev) => props.onChangeActiveAnnotation(ev.target.value) }
              placeholder="Enter new annotation here"
              value={props.page_data.annotations.active_value}>
            </textarea>
            <input type="submit" value="Submit"/>
          </form>
        </div>:
        null
    }
    {
      props.page_data.annotations.active_type === "new" ?
        null:
        props.page_data.section.current_user === "guest" ?
          <div className="Highlight__buttons"><button className="Highlight__button Highlight__add" disabled>Sign up to add annotations</button></div>:
          <div className="Highlight__buttons"><button className="Highlight__button Highlight__add" onClick={props.onClickAdd}>Add Annotation</button></div>
    }
    </div>
  )
}

Annotations.propTypes = {
  page_data: PropTypes.object.isRequired,
  onChangeActiveAnnotation: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onSubmitEditedAnnotation: PropTypes.func.isRequired,
  onSubmitNewAnnotation: PropTypes.func.isRequired,
};

export default Annotations;
