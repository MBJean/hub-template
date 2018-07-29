import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InputActionCreators from '../actions/input';

class Hub extends Component {

  static propTypes = {
    inputs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.updateValue = bindActionCreators(InputActionCreators.updateValue, dispatch);
  }

  render() {
    const { inputs } = this.props;
    const TEXT = inputs[inputs.findIndex( obj => obj.id === "text" )];
    return (
      <div className="TextAdd">
        <div className="TextAdd__panel">
          <textarea
            className="TextAdd__textarea"
            placeholder="Insert Latin text here"
            onChange={ (ev) => {this.updateValue(0, ev.target.value)} }>
          </textarea>
        </div>
        <div className="TextAdd__panel">
          {
            TEXT.value.map((input, index) => <p key={index}>{input}</p>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputs: state
  };
};

export default connect(mapStateToProps)(Hub);
