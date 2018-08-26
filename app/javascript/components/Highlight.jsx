import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertEntities from '../helpers/convertEntities';
import createPostBody from '../helpers/createPostBody';
import renderUnsafeXml from '../helpers/renderUnsafeXml';
import fetchArray from '../helpers/fetchArray';
import parseXml from '../helpers/parseXml';

export default class Highlight extends Component {

  state = {
    comments_active: {},
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
    switch (options.type) {
      case "comment":
        new_arr = {...this.state.comments_active};
        new_arr[options.line_id].indexOf(options.entry_id) !== -1 ?
          new_arr[options.line_id].splice(new_arr[options.line_id].indexOf(options.entry_id), 1):
          new_arr[options.line_id].push(options.entry_id)
        this.setState({
          comments_active: new_arr
        });
      break;
      case "translation":
        new_arr = {...this.state.translations_active};
        new_arr[options.line_id].indexOf(options.entry_id) !== -1 ?
          new_arr[options.line_id].splice(new_arr[options.line_id].indexOf(options.entry_id), 1):
          new_arr[options.line_id].push(options.entry_id)
        this.setState({
          translations_active: new_arr
        });
      break;
      default:
      break;
    }
  }

  onMouseUpText = () => {
    // use the getSelection API to capture user selection
      // checks against a selection of nothing
        // baseOffset represent index of beginning of selection, focusOffset represents final index of selection
    document.getElementById("Highlight").onmouseup = function() {
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
  }

  render() {
    return (
      <div className="Highlight" onMouseUp={this.onMouseUpText}>
        {
          this.props.text.lines.map( (line) => {
            return (
              <div className="Highlight__line" key={line.id}>
                <p className="Highlight__text">{line.text}
                  {
                    line.comments.map( comment => {
                      return <span
                              className="Highlight__highlight Highlight__highlight--comment"
                              key={comment.id + comment.ind_start}
                              onClick={() => { this.onClickHighlight({
                                entry_id: comment.id,
                                line_id: line.id,
                                type: 'comment'
                              }) }}
                              style={
                                {
                                  top: 0,
                                  left: (((comment.ind_start - 1) / line.text.length) * 100) + '%',
                                  width: (((comment.ind_end - comment.ind_start) / line.text.length) * 100) + '%'
                                }
                              }></span>
                    })
                  }
                  {
                    line.translations.map( translation => {
                      return <span
                              className="Highlight__highlight Highlight__highlight--translation"
                              key={translation.id + translation.ind_start}
                              onClick={() => { this.onClickHighlight({
                                entry_id: translation.id,
                                line_id: line.id,
                                type: 'translation'
                              }) }}
                              style={
                                {
                                  top: 0,
                                  left: (((translation.ind_start - 1) / line.text.length) * 100) + '%',
                                  width: (((translation.ind_end - translation.ind_start) / line.text.length) * 100) + '%'
                                }
                              }></span>
                    })
                  }
                </p>
                {
                  line.comments.map( comment => {
                    if (this.state.comments_active[line.id].indexOf(comment.id) !== -1) {
                      return (
                        <div className="Highlight__comment Highlight__comment--active" key={comment.id}>
                          <span
                            className="Highlight__close"
                            onClick={() => { this.onClickHighlight({
                              entry_id: comment.id,
                              line_id: line.id,
                              type: 'comment'
                            }) }}>
                            &#x2716;
                          </span>
                          {
                            comment.entries.map( entry => {
                              return <p className="Highlight__entry" key={entry.id}>{entry.text} &#8213; {entry.author}</p>;
                            })
                          }
                        </div>
                      );
                    }
                  } )
                }
                {
                  line.translations.map( translation => {
                    if (this.state.translations_active[line.id].indexOf(translation.id) !== -1) {
                      return (
                        <div className="Highlight__translation Highlight__translation--active" key={translation.id}>
                          <span
                            className="Highlight__close"
                            onClick={() => { this.onClickHighlight({
                              entry_id: translation.id,
                              line_id: line.id,
                              type: 'translation'
                            }) }}>
                            &#x2716;
                          </span>
                          {
                            translation.entries.map( entry => {
                              return <p className="Highlight__entry" key={entry.id}>&#8220;{entry.text}&#8221; &#8213; {entry.author}</p>;
                            })
                          }
                        </div>
                      );
                    }
                  } )
                }
              </div>
            );
          })
        }
      </div>
    )
  }
}
