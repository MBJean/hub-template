import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Text = props => {
  return (
    <p className="Highlight__text">{props.line.text}
      {
        props.line.comments.map( comment => {
          return <span
                  className="Highlight__highlight Highlight__highlight--comment"
                  key={comment.id + comment.ind_start}
                  onClick={() => { props.onClickHighlight({
                    entry_id: comment.id,
                    line_id: props.line.id,
                    type: 'comment'
                  }) }}
                  style={
                    {
                      top: 0,
                      left: (((comment.ind_start - 1) / props.line.text.length) * 100) + '%',
                      width: (((comment.ind_end - comment.ind_start) / props.line.text.length) * 100) + '%'
                    }
                  }></span>
        })
      }
      {
        props.line.translations.map( translation => {
          return <span
                  className="Highlight__highlight Highlight__highlight--translation"
                  key={translation.id + translation.ind_start}
                  onClick={() => { props.onClickHighlight({
                    entry_id: translation.id,
                    line_id: props.line.id,
                    type: 'translation'
                  }) }}
                  style={
                    {
                      top: 0,
                      left: (((translation.ind_start - 1) / props.line.text.length) * 100) + '%',
                      width: (((translation.ind_end - translation.ind_start) / props.line.text.length) * 100) + '%'
                    }
                  }></span>
        })
      }
    </p>
  )
}

Text.propTypes = {
  line: PropTypes.object.isRequired,
  onClickHighlight: PropTypes.func.isRequired,
};

export default Text;
