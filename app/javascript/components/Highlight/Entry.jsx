import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Entry = props => {
  return (
    <div className={`Highlight__entry Highlight__entry--${props.type}`} key={props.entry.id}>
      <h3>Line {props.line.line_number}</h3>
      {
        props.entry.entries.map( content => {
          return <p className="Highlight__text" key={content.id}>{content.text} &#8213; {content.author}</p>;
        })
      }
    </div>
  )
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  line: PropTypes.object.isRequired,
  onClickHighlight: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Entry;
