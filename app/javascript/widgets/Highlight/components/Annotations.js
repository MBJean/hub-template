import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Annotation from './Annotation';


export default class Annotations extends Component {
  state = {
    value: ""
  }
  updateValue = (ev) => {
    this.setState({
      value: ev.target.value
    });
  }
  render() {
    return (
      <div className="Highlight__annotations">
        <div className="Highlight__header">
        </div>
        {
          this.props.page_data.annotations.active_type === "new" ?
            null:
            this.props.page_data.section.current_user === "guest" ?
              <button className="mdc-button" disabled>Sign up to add annotations</button>:
              <button className="mdc-button" onClick={this.props.onClickAdd}>Add Annotation</button>
        }
        {
          this.props.page_data.annotations.active_type === "add" ?
            <div className="Highlight__add">
              <h2>Add new annotation</h2>
              <form onSubmit={ (ev) => this.props.onSubmitNewAnnotation(ev, { annotation: this.props.page_data.annotations.active_annotations[0], value: this.state.value }) }>
                <textarea
                  className="Highlight__textarea"
                  maxLength="1000"
                  onChange={ (ev) => this.updateValue(ev) }
                  placeholder="Enter additional annotation here"
                  value={this.state.value}>
                </textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>:
            null
        }
        <ul className="Highlight__list mdc-list" aria-orientation="vertical">
          {
            this.props.page_data.annotations.active_annotations.map( annotation => (
              <Annotation
                annotation={annotation}
                annotation_data={this.props.page_data.annotations}
                onClickDelete={this.props.onClickDelete}
                onClickEdit={this.props.onClickEdit}
                onSubmitEditedAnnotation={this.props.onSubmitEditedAnnotation}
                section_data={this.props.page_data.section}
                key={`annotations-${annotation.id}-${annotation.start_index}`}
                updateValue={this.updateValue}
                value={this.state.value}
                />
            ))
          }
        </ul>
        {
          this.props.page_data.annotations.active_type === "new" ?
            <div className="Highlight__editing">
              <h2>Add new annotation</h2>
              <ul className="Highlight__list">
                <li>Line(s): {`${this.props.page_data.annotations.active_annotation.line}`}</li>
                <li>Lemma: <i>{`${this.props.page_data.annotations.active_annotation.lemma}`}</i></li>
              </ul>
              <form onSubmit={ (ev) => this.props.onSubmitNewAnnotation(ev, { annotation: this.props.page_data.annotations.active_annotation, value: this.state.value }) }>
                <textarea
                  className="Highlight__textarea"
                  maxLength="1000"
                  onChange={ (ev) => this.updateValue(ev) }
                  placeholder="Enter new annotation here"
                  value={this.state.value}>
                </textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>:
            null
        }
      </div>
    )
  }
}
