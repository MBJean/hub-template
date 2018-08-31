import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities';
import createPostBody from '../helpers/createPostBody';
import renderUnsafeXml from '../helpers/renderUnsafeXml';
import fetchArray from '../helpers/fetchArray';
import parseXml from '../helpers/parseXml';
import Line from './Highlight/Line';
import Entry from './Highlight/Entry';

export default class Highlight extends Component {

  state = {
    anootations_active: false,
    annotations: []
  }

  onClickHighlight = (annotations) => {
    console.log(annotations);
    let hold_arr = [...this.state.annotations];
    hold_arr.push(annotations);
    let hold_active = hold_arr.length > 0 ? true: false;
    this.setState({
      annotations_active: hold_active,
      annotations: hold_arr
    });
  }

  onMouseUpText = (e) => {
    // use the getSelection API to capture user selection
      // checks against a selection of nothing
        // baseOffset represent index of beginning of selection, focusOffset represents final index of selection
    let t = (document.all) ? document.selection.createRange().text : document.getSelection();
    console.log(t);
    if (t.baseOffset !== t.focusOffset) {
      //console.log(t);
      //console.log( t.focusNode.nodeValue.substring(t.baseOffset, t.focusOffset) );
    }
    // TODO: account for when highlight moves over multiple lines
      // could equality check anchorNode.nodeValue and focusNode.nodeValue
    // TODO: note that here, I've captured user selection by line and by indices within that line, so:
      // create join table between 'texts' table and 'comments' table
      // add entry to 'comments' table with foreign key pointing to appropriate text
        // in entry, add line number
        // in entry, add indices indicated above
      // on component mounting, do lookup in database for current text, finding all comments in join table
        // render on page all highlighted text, keying comment to them in the rendered elements below
    // TODO: create editor feature
    // TODO: have editor feature appear on highlight
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
      for (let j = counter_j; j < line.text.split(' ').length; j++) {
        let word = line.text.split(' ')[j];
        let annotations = this.props.json_data.annotations;
        let num = line.line_number;
        if (num in annotations) {
          if (j in annotations[num]) {
            let lem = annotations[num][j].lemmata;
            output_arr.push(<mark className="Highlight__highlight" key={`${num}-${j}`} onClick={ () => {this.onClickHighlight(annotations[num][j])} }>{lem.join('\n')}</mark>);
            // move line counter up equal to number of 'lines' in the lemmata
            // move word counter up equal to number of words in the final 'line' of the lemmata
            if (lem.length > 1) {
              i += lem.length - 2;
              skip_lines = true;
              j = line.text.split(' ').length;
              counter_j = lem[lem.length - 1].split(' ').length;
              output_arr.push(' ');
            } else {
              j = j + lem[lem.length - 1].split(' ').length - 1;
            }
          } else {
            output_arr.push(word);
          }
        } else {
          output_arr.push(word);
        }
        j < line.text.split(' ').length - 1 ? output_arr.push(' '): null;
      }
      !skip_lines ? output_arr.push('\n'): null;
    }
    return (
      <div className="Highlight">
        <div className="Highlight__lines" id="Highlight__lines" onMouseUp={this.onMouseUpText} style={{ whiteSpace: 'pre-line' }}>
          {
            output_arr.map( el => el )
          }
        </div>
        <div className={`Highlight__content ${this.state.annotations_active ? 'Highlight__content--active': 'Highlight__content--inactive' }`}>
        {
          this.state.annotations_active ?
            this.state.annotations.map( annotation => <div>{annotation.entries.map( entry => <div><p>{ entry.text }</p><p>{ entry.author }</p></div> )}</div>):
            null
        }
        </div>
      </div>
    )
  }
}
