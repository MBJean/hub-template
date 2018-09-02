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
    current_editing: false
  }

  onClickHighlight = (annotation) => {
    let temp_arr = [...this.state.annotations];
    let temp_ind = temp_arr.findIndex( obj => obj.id === annotation.id && obj.start === annotation.start );
    temp_ind === -1 ? temp_arr.push(annotation): temp_arr.splice(temp_ind, 1);
    this.setState({
      annotations_active: temp_arr.length > 0,
      annotations: temp_arr
    });
  }

  onMouseUpText = (e) => {
    let annotation_object = buildAnnotationObject();
    if (annotation_object.error === null) {
      this.setState({
        current_highlight_editing: annotation_object.response,
        current_editing: true
      }, () => console.log(this.state.current_highlight_editing) );
    }
  }

  render() {
    let output_arr = [];
    let counter_j = 0;
    let skip_lines = false;
    for (let i = 0; i < this.props.json_data.lines.length; i++) {
      if (skip_lines) {
        skip_lines = false;
      } else {
        counter_j = 0;
      }
      let line = this.props.json_data.lines[i];
      let line_by_word = line.text.split(' ');
      for (let j = counter_j; j < line_by_word.length; j++) {
        let word = line_by_word[j];
        let annotations = this.props.json_data.annotations;
        let num = line.line_number;
        let annotations_by_line = annotations.find( annotation => annotation.line == num );
        if (annotations_by_line !== undefined) {
          let annotation_by_word = annotations_by_line.entries.find( entry => entry.start == j );
          if (annotation_by_word !== undefined) {
            let lem = annotation_by_word.lemmata;
            output_arr.push((
              <mark
                className={ `Highlight__highlight Highlight__highlight--${ this.state.annotations.find( obj => obj.id === annotation_by_word.id && obj.start === annotation_by_word.start ) !== undefined ? 'active': 'inactive'}` }
                key={`highlight-${annotations_by_line.line}-${annotation_by_word.start}`}
                onClick={ () => {this.onClickHighlight(annotation_by_word)} }
                onMouseUp={this.onMouseUpText}>
                {lem.join('\n')} </mark>
            ));
            // move line counter up equal to number of 'lines' in the lemmata
            // move word counter up equal to number of words in the final 'line' of the lemmata
            if (lem.length > 1) {
              i += lem.length - 2;
              skip_lines = true;
              j = line_by_word.length;
              counter_j = lem[lem.length - 1].split(' ').length;
              output_arr.push(' ');
            } else {
              j = j + lem[lem.length - 1].split(' ').length - 1;
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
        <div className={`Highlight__content ${this.state.annotations_active ? 'Highlight__content--active': 'Highlight__content--inactive' }`}>
        {
          this.state.annotations_active ?
            this.state.annotations.map( annotation => (
              <div className="Highlight__entry" key={`annotations-${annotation.id}-${annotation.start}`}>
                <p><b>{annotation.lemmata.join(' ')}</b></p>
                {
                  annotation.entries.map( (entry, index) => (
                    <div className="Highlight__text" key={`annotation-${entry.id}`}>
                      <p>{ entry.text }</p>
                      <p>{ entry.author }</p>
                    </div>
                  ))
                }
              </div>
            )):
            null
        }
        </div>
      </div>
    )
  }
}
