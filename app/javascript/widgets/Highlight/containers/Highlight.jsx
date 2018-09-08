import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HighlightActionCreators from '../actions/highlight';
import Annotation from '../components/Annotation';

class Highlight extends Component {

  static propTypes = {
    highlight: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.errorHandler = bindActionCreators(HighlightActionCreators.errorHandler, dispatch);
    this.onChangeActiveAnnotation = bindActionCreators(HighlightActionCreators.onChangeActiveAnnotation, dispatch);
    this.onClickAnnotation = bindActionCreators(HighlightActionCreators.onClickAnnotation, dispatch);
    this.onClickAdd = bindActionCreators(HighlightActionCreators.onClickAdd, dispatch);
    this.onClickDelete = bindActionCreators(HighlightActionCreators.onClickDelete, dispatch);
    this.onClickEdit = bindActionCreators(HighlightActionCreators.onClickEdit, dispatch);
    this.onMouseUpText = bindActionCreators(HighlightActionCreators.onMouseUpText, dispatch);
    this.onSubmitEditedAnnotation = bindActionCreators(HighlightActionCreators.onSubmitEditedAnnotation, dispatch);
    this.onSubmitNewAnnotation = bindActionCreators(HighlightActionCreators.onSubmitNewAnnotation, dispatch);
    this.resetState = bindActionCreators(HighlightActionCreators.resetState, dispatch);
    this.setSection = bindActionCreators(HighlightActionCreators.setSection, dispatch);
  }

  componentDidMount = () => {
    this.setSection(`${this.props.options.section_id}`);
  }

  buildSection = (page_data) => {
    let output_arr = [];
    let counter_j = 0;
    let skip_lines = false;
    for (let i = 0; i < page_data.section.lines.length; i++) {
      if (skip_lines) {
        skip_lines = false;
      } else {
        counter_j = 0;
      }
      let line = page_data.section.lines[i];
      let line_by_word = line.content.split(' ');
      for (let j = counter_j; j < line_by_word.length; j++) {
        let word = line_by_word[j];
        let annotations = page_data.section.annotations;
        let num = line.line_number;
        let annotations_by_line = annotations.filter( annotation => annotation.line_id == line.id );
        if (annotations_by_line.length > 0) {
          let annotations_by_word = annotations_by_line.filter( entry => entry.start_index == j );
          if (annotations_by_word.length > 0) {
            let lemma = annotations_by_word[0].lemma;
            output_arr.push((
              <mark
                className={ `Highlight__highlight Highlight__highlight--${ page_data.annotations.active_annotations.find( obj => obj.id === annotations_by_word.id && obj.start === annotations_by_word.start ) !== undefined ? 'active': 'inactive'}` }
                key={`highlight-${annotations_by_line[0].line_id}-${annotations_by_word[0].start_index}`}
                onClick={ () => {this.onClickAnnotation(annotations_by_word)} }
                onMouseUp={ () => this.onMouseUpText(this.props.options, page_data.section.current_user) }>
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
                onMouseUp={ () => this.onMouseUpText(this.props.options, page_data.section.current_user) }>
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
              onMouseUp={ () => this.onMouseUpText(this.props.options, page_data.section.current_user) }>
              {word} </span>
          ));
        }
      }
      !skip_lines ? output_arr.push('\n'): null;
    }
    return output_arr;
  }

  render() {
    const { highlight } = this.props;
    const page_data = {
      "section": highlight[0],
      "annotations": highlight[1]
    };
    return (
      <div className="Highlight">
        <div className="Highlight__lines" id="Highlight__lines" style={{ whiteSpace: 'pre-line' }}>
          { this.buildSection(page_data) }
        </div>
        <div className={`Highlight__annotations ${page_data.annotations.is_active ? 'Highlight__annotations--active': 'Highlight__annotations--inactive' }`}>
        {
          page_data.annotations.active_annotations.length > 0 ?
            <div className="Highlight__header">
              <p><i>{page_data.annotations.active_annotations[0].lemma}</i></p>
            </div>:
            null
        }
        {
          page_data.annotations.active_type === "add" ?
            <div className="Highlight__add">
              <p><b>Add new annotation</b></p>
              <form onSubmit={ (ev) => this.onSubmitNewAnnotation(ev, { annotation: page_data.annotations.active_annotations[0], value: page_data.annotations.active_value }) }>
                <textarea
                  className="Highlight__textarea"
                  maxLength="1000"
                  onChange={ (ev) => this.onChangeActiveAnnotation(ev.target.value) }
                  placeholder="Enter additional annotation here"
                  value={page_data.annotations.active_value}>
                </textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>:
            null
        }
        {
          page_data.annotations.active_annotations.map( annotation => (
            <Annotation
              annotation={annotation}
              annotation_data={page_data.annotations}
              onChangeActiveAnnotation={this.onChangeActiveAnnotation}
              onClickDelete={this.onClickDelete}
              onClickEdit={this.onClickEdit}
              onSubmitEditedAnnotation={this.onSubmitEditedAnnotation}
              section_data={page_data.section}
              key={`annotations-${annotation.id}-${annotation.start_index}`}
              />
          ))
        }
        {
          page_data.annotations.active_type === "new" ?
            <div className="Highlight__editing">
              <p><b>Add new annotation</b></p>
              <ul className="Highlight__list">
                <li>Lines(s): {`${page_data.annotations.active_annotation.line}`}</li>
                <li>Lemma: <i>{`${page_data.annotations.active_annotation.lemma}`}</i></li>
              </ul>
              <form onSubmit={ (ev) => this.onSubmitNewAnnotation(ev, { annotation: page_data.annotations.active_annotation, value: page_data.annotations.active_value }) }>
                <textarea
                  className="Highlight__textarea"
                  maxLength="1000"
                  onChange={ (ev) => this.onChangeActiveAnnotation(ev.target.value) }
                  placeholder="Enter new annotation here"
                  value={page_data.annotations.active_value}>
                </textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>:
            <div className="Highlight__buttons">
              {
                page_data.section.current_user === "guest" ?
                  <button className="Highlight__button Highlight__add" disabled>Sign up to add annotations</button>:
                  <button className="Highlight__button Highlight__add" onClick={this.onClickAdd}>Add Annotation</button>
              }
            </div>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    highlight: state
  };
};

export default connect(mapStateToProps)(Highlight);
