import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities';
import createPostBody from '../helpers/createPostBody';
import renderUnsafeXml from '../helpers/renderUnsafeXml';
import fetchArray from '../helpers/fetchArray';
import parseXml from '../helpers/parseXml';
import Text from './Highlight/Text';
import Entry from './Highlight/Entry';

export default class Highlight extends Component {

  state = {
    comments_active: {},
    is_active_content: false,
    num_active: 0,
    translations_active: {}
  }

  componentWillMount = () => {
    let new_comments_active = [];
    let new_translations_active = [];
    this.props.text.lines.forEach( line => {
      new_comments_active[line.id] = [];
      new_translations_active[line.id] = [];
    });
    this.setState({
      comments_active: new_comments_active,
      translations_active: new_translations_active
    });
  }

  onClickHighlight = (options) => {
    let new_arr = [];
    let new_num_active = this.state.num_active;
    switch (options.type) {
      case "comment":
        new_arr = {...this.state.comments_active};
      break;
      case "translation":
        new_arr = {...this.state.translations_active};
      break;
      default:
      break;
    }
    if (new_arr[options.line_id].indexOf(options.entry_id) !== -1) {
      new_arr[options.line_id].splice(new_arr[options.line_id].indexOf(options.entry_id), 1);
      new_num_active--;
    } else {
      new_arr[options.line_id].push(options.entry_id);
      new_num_active++;
    }
    this.setState({
      is_active_content: new_num_active > 0 ? true: false,
      num_active: new_num_active,
      translations_active: new_arr
    });
  }

  onMouseUpText = () => {
    /*
    // use the getSelection API to capture user selection
      // checks against a selection of nothing
        // baseOffset represent index of beginning of selection, focusOffset represents final index of selection
    document.getElementById("Highlight__lines").onmouseup = function() {
      let t = (document.all) ? document.selection.createRange().text : document.getSelection();
      if (t.baseOffset !== t.focusOffset) {
        console.log(t);
        console.log( t.focusNode.nodeValue.substring(t.baseOffset, t.focusOffset) );
      }
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
    */
  }

  render() {
    return (
      <div className="Highlight">
        <div className="Highlight__lines" id="Highlight__lines" onMouseUp={this.onMouseUpText}>
          {
            this.props.text.lines.map( line => {
              return (
                <div className="Highlight__line" key={line.id}>
                  <Text line={line} onClickHighlight={this.onClickHighlight}/>
                </div>
              );
            })
          }
        </div>
        <div className={`Highlight__content Highlight__content--${this.state.is_active_content ? 'active': 'inactive'}`}>
          {
            this.props.text.lines.map( line => {
              return line.comments.map( comment => {
                return this.state.comments_active[line.id].indexOf(comment.id) !== -1 ?
                  <Entry entry={comment} line={line} onClickHighlight={this.onClickHighlight} type='comment'/>:
                  null;
              } )
            } )
          }
          {
            this.props.text.lines.map( line => {
              return line.translations.map( translation => {
                return this.state.translations_active[line.id].indexOf(translation.id) !== -1 ?
                  <Entry entry={translation} line={line} onClickHighlight={this.onClickHighlight} type='translation'/>:
                  null;
              } )
            } )
          }
        </div>
      </div>
    )
  }
}
