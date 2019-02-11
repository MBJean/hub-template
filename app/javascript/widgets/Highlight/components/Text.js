import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Text = props => {
  console.log('highlight text is rerendering');
  let output_arr = [];
  let counter_j = 0;
  let skip_lines = false;
  for (let i = 0; i < props.page_data.section.lines.length; i++) {
    if (skip_lines) {
      skip_lines = false;
    } else {
      counter_j = 0;
    }
    let line = props.page_data.section.lines[i];
    let line_by_word = line.content.split(' ');
    for (let j = counter_j; j < line_by_word.length; j++) {
      let word = line_by_word[j];
      let annotations = props.page_data.section.annotations;
      let num = line.line_number;
      let annotations_by_line = annotations.filter( annotation => annotation.line_id == line.id );
      if (annotations_by_line.length > 0) {
        let annotations_by_word = annotations_by_line.filter( entry => entry.start_index == j );
        if (annotations_by_word.length > 0) {
          let lemma = annotations_by_word[0].lemma;
          output_arr.push((
            <mark
              className={ `Highlight__highlight Highlight__highlight--${ props.page_data.annotations.active_annotations.length && props.page_data.annotations.active_annotations[0].lemma === lemma ? 'active': 'inactive'}` }
              key={`highlight-${annotations_by_line[0].line_id}-${annotations_by_word[0].start_index}`}
              onClick={ () => {props.onClickAnnotation(annotations_by_word)} }
              onMouseUp={ () => props.onMouseUpText(props.options, props.page_data.section.current_user) }>
              {lemma} </mark>
          ));
          // move line counter up equal to number of 'lines' in the lemmata
          // move word counter up equal to number of words in the final 'line' of the lemmata
          if (lemma.split('\n').length > 1) {
            i += lemma.split('\n').length - 2;
            skip_lines = true;
            j = line_by_word.length;
            counter_j = lemma.split('\n')[lemma.split('\n').length - 1].split(' ').length;
            output_arr.push(' ');
          } else {
            j = j + lemma.split('\n')[lemma.split('\n').length - 1].split(' ').length - 1;
          }
        } else {
          output_arr.push((
            <span
              className="Highlight__word"
              data-line={line.line_number}
              data-lid={line.id}
              data-word={j}
              key={`word-${line.line_number}-${j}`}
              onMouseUp={ () => props.onMouseUpText(props.options, props.page_data.section.current_user) }>
              {word} </span>
          ));
        }
      } else {
        output_arr.push((
          <span
            className="Highlight__word"
            data-line={line.line_number}
            data-lid={line.id}
            data-word={j}
            key={`word-${line.line_number}-${j}`}
            onMouseUp={ () => props.onMouseUpText(props.options, props.page_data.section.current_user) }>
            {word} </span>
        ));
      }
    }
    !skip_lines ? output_arr.push('\n'): null;
  }
  return (
    <div className="Highlight__lines" id="Highlight__lines" style={{ whiteSpace: 'pre-line' }}>
      { output_arr }
    </div>
  )
}

Text.propTypes = {
  page_data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onClickAnnotation: PropTypes.func.isRequired,
  onMouseUpText: PropTypes.func.isRequired
};

export default Text;
