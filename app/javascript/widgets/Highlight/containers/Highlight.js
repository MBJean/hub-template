import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HighlightActionCreators from '../actions/highlight';
import Annotations from '../components/Annotations';
import Text from '../components/Text';

class Highlight extends Component {

  static propTypes = {
    highlight: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.errorHandler = bindActionCreators(HighlightActionCreators.errorHandler, dispatch);
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

  render() {
    const { highlight } = this.props;
    const PAGE_DATA = {
      "section": highlight[0],
      "annotations": highlight[1]
    };
    return (
      <div className="Highlight">

        <div className="Highlight__header">
          <h1>{this.props.options.title}</h1>
        </div>
        <Text
          onClickAnnotation={this.onClickAnnotation}
          onMouseUpText={this.onMouseUpText}
          options={this.props.options}
          page_data={PAGE_DATA}
        />

        {
          PAGE_DATA.annotations.is_active ?
            <Annotations
              page_data={PAGE_DATA}
              onClickAdd={this.onClickAdd}
              onClickDelete={this.onClickDelete}
              onClickEdit={this.onClickEdit}
              onSubmitEditedAnnotation={this.onSubmitEditedAnnotation}
              onSubmitNewAnnotation={this.onSubmitNewAnnotation}
            />:
            null
        }

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
