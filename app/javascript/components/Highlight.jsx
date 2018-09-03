import React, { Component } from 'react';
import PropTypes from 'prop-types';
import buildAnnotationObject from '../helpers/buildAnnotationObject';
import Line from './Highlight/Line';
import Entry from './Highlight/Entry';

export default class Highlight extends Component {

  state = {
    annotations_active: false,
    annotations: [],
    current_highlight_editing: {},
    data: {
      lines: [],
      annotations: []
    },
    editing_active: false
  }

  componentDidMount = () => {
    fetch(`/api/v1/section/${this.props.options.section_id}`)
      .then(
        response => response.json().then( json => {
          let output_json = {...json};
          output_json.lines.sort( (a, b) => a.id > b.id ? 1: -1 );
          this.setState({ data: output_json })
        }),
        error => error
      );
  }

  onClickHighlight = (annotations_array) => {
    let temp_arr = [...this.state.annotations];
    annotations_array.forEach( annotation => {
      let temp_ind = temp_arr.findIndex( obj => obj.id === annotation.id && obj.start === annotation.start );
      temp_ind === -1 ? temp_arr.push(annotation): temp_arr.splice(temp_ind, 1);
    });
    this.setState({
      annotations_active: temp_arr.length > 0,
      annotations: temp_arr,
      current_highlight_editing: {},
      editing_active: false
    });
  }

  onChangeAnnotation = (ev) => {
    let temp_obj = {...this.state.current_highlight_editing};
    temp_obj.annotation.text = ev.target.value;
    this.setState({
      current_highlight_editing: temp_obj
    });
  }

  onMouseUpText = (e) => {
    let annotation_object = buildAnnotationObject();
    console.log(annotation_object);
    if (annotation_object.error === null) {
      this.setState({
        annotations_active: false,
        annotations: [],
        current_highlight_editing: annotation_object.response,
        editing_active: true
      });
    }
  }

  onSubmitNewAnnotation = (ev) => {
    ev.preventDefault();
    console.log(this.state.current_highlight_editing);
  }

  render() {
    let output_arr = [];
    let counter_j = 0;
    let skip_lines = false;
    for (let i = 0; i < this.state.data.lines.length; i++) {
      if (skip_lines) {
        skip_lines = false;
      } else {
        counter_j = 0;
      }
      let line = this.state.data.lines[i];
      let line_by_word = line.content.split(' ');
      for (let j = counter_j; j < line_by_word.length; j++) {
        let word = line_by_word[j];
        let annotations = this.state.data.annotations;
        let num = line.line_number;
        let annotations_by_line = annotations.filter( annotation => annotation.line_id == line.id );
        if (annotations_by_line.length > 0) {
          let annotations_by_word = annotations_by_line.filter( entry => entry.start_index == j );
          if (annotations_by_word.length > 0) {
            let lemma = annotations_by_word[0].lemma;
            output_arr.push((
              <mark
                className={ `Highlight__highlight Highlight__highlight--${ this.state.annotations.find( obj => obj.id === annotations_by_word.id && obj.start === annotations_by_word.start ) !== undefined ? 'active': 'inactive'}` }
                key={`highlight-${annotations_by_line[0].line_id}-${annotations_by_word[0].start_index}`}
                onClick={ () => {this.onClickHighlight(annotations_by_word)} }
                onMouseUp={this.onMouseUpText}>
                {lemma} </mark>
            ));
            // move line counter up equal to number of 'lines' in the lemmata
            // move word counter up equal to number of words in the final 'line' of the lemmata
            if (lemma.split('\n').length > 1) {
              i += lemma.split('\n').length - 2;
              skip_lines = true;
              j = line_by_word.length;
              counter_j = lemma.split('\n')[lemma.split('\n').length - 1].split(' ').length - 1;
              output_arr.push(' ');
            } else {
              j = j + lemma.split('\n')[lemma.split('\n').length - 1].split(' ').length - 1;
            }
          } else {
            output_arr.push((
              <span
                className="Highlight__word"
                data-line={line.line_number}
                data-word={j}
                key={`word-${line.line_number}-${j}`}
                onMouseUp={this.onMouseUpText}>
                {word} </span>
            ));
          }
        } else {
          output_arr.push((
            <span
              className="Highlight__word"
              data-line={line.line_number}
              data-word={j}
              key={`word-${line.line_number}-${j}`}
              onMouseUp={this.onMouseUpText}>
              {word} </span>
          ));
        }
      }
      !skip_lines ? output_arr.push('\n'): null;
    }
    return (
      <div className="Highlight">
        <div className="Highlight__lines" id="Highlight__lines" style={{ whiteSpace: 'pre-line' }}>
          { output_arr }
        </div>
        <div className={`Highlight__annotations ${this.state.annotations_active || this.state.editing_active ? 'Highlight__annotations--active': 'Highlight__annotations--inactive' }`}>
        {
          this.state.annotations_active ?
            this.state.annotations.map( annotation => (
              <div className="Highlight__entry" key={`annotations-${annotation.id}-${annotation.start_index}`}>
                <p><b>{annotation.lemma}</b></p>
                <div className="Highlight__text">
                  <p>{ annotation.content }</p>
                  <p>{ annotation.user_id }</p>
                </div>
              </div>
            )):
            null
        }
        {
          this.state.editing_active ?
            <div className="Highlight__editing">
              <p><b>Add new annotation</b></p>
              <ul className="Highlight__list">
                <li>Lines(s): {`${ this.state.current_highlight_editing.line}`}</li>
                <li>Lemma: <i>{`${this.state.current_highlight_editing.lemma}`}</i></li>
              </ul>
              <form onSubmit={this.onSubmitNewAnnotation}>
                <textarea className="Highlight__textarea" maxLength="1000" onChange={this.onChangeAnnotation} placeholder="Enter new annotation here"></textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>:
            null
        }
        </div>
      </div>
    )
  }
}
