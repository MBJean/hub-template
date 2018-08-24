import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities';
import createPostBody from '../helpers/createPostBody';
import renderUnsafeXml from '../helpers/renderUnsafeXml';
import fetchArray from '../helpers/fetchArray';
import parseXml from '../helpers/parseXml';
import test_json from '../../../lib/data/test_json.json';

export default class Highlight extends Component {

  state = {
  }

  onMouseUpText = () => {
    // use the getSelection API to capture user selection
    document.getElementById("Highlight").onmouseup = function() {
      let t = (document.all) ? document.selection.createRange().text : document.getSelection();
      // checks against a selection of nothing
      if (t.baseOffset !== t.focusOffset) {
        console.log(t);
        console.log( t.focusNode.nodeValue.substring(t.baseOffset, t.focusOffset) );
      }
      // baseOffset represent index of beginning of selection
      // focusOffset represents final index of selection
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
    return (
      <div className="Highlight" onMouseUp={this.onMouseUpText}>
        {
          test_json.lines.map( (line) => {
            return (
              <div className="Highlight__line">
                <p key={line.line}>{line.text}</p>
                {
                  line.comments.map( comment => <span>{comment.text}</span> )
                }
                {
                  line.translations.map( translations => <span>{translations.text}</span> )
                }
              </div>
            );
          })
        }
      </div>
    )
  }
}
