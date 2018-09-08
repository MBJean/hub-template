import * as HighlightActionTypes from '../actiontypes/highlight';

const initialState = [
  {
    id: "section",
    section_id: null,
    lines: [],
    annotations: [],
    current_user: ''
  },
  {
    id: "annotations",
    active_annotations: [], // already present annotations
    active_annotation: {}, // annotation being added to, edited, etc.
    active_type: "", // "new", "additional", or "old"
    active_value: "", // string value for annotation being edited, added to, etc.
    is_active: false
  },
  {
    id: "error",
    is_active: false,
    message: ""
  }
];

export default function Highlight(state = initialState, action) {
  switch(action.type) {

    case HighlightActionTypes.ACTIVATE_ADD_ANNOTATION:
      return state.map((input, index) =>
        index === 1 ?
          {
            ...input,
            active_type: "add",
            is_active: true
          }:
          input
      );

    case HighlightActionTypes.ACTIVATE_EDIT_ANNOTATION:
      return state.map((input, index) =>
        index === 1 ?
          {
            ...input,
            active_annotation: action.annotation,
            active_type: "edit",
            is_active: true,
            active_value: action.annotation.content
          }:
          input
      );

    case HighlightActionTypes.ACTIVATE_NEW_ANNOTATION:
      return state.map((input, index) =>
        index === 1 ?
          {
            ...input,
            active_annotations: [],
            active_annotation: action.new_annotation,
            active_type: "new",
            is_active: true
          }:
          input
      );

    case HighlightActionTypes.ERROR_HANDLER:
      return state.map((input, index) =>
        index === 2 ?
          {
            ...input,
            error: {
              is_error: true,
              error_message: action.error
            }
          }:
          input
      );

    case HighlightActionTypes.RESET_STATE:
      return state.map( (input, index) =>
        index === 0 ?
          {
            ...input
          }:
          initialState[index]);

    case HighlightActionTypes.SET_SECTION:
      return state.map((input, index) =>
        index === 0 ?
          {
            ...input,
            section_id: action.id
          }:
          input
      );

    case HighlightActionTypes.UPDATE_ACTIVE_ANNOTATIONS:
      return state.map((input, index) =>
        index === 1 ?
          {
            ...input,
            active_annotations: action.annotations,
            active_type: "list",
            is_active: true
          }:
          input
      );

    case HighlightActionTypes.UPDATE_ACTIVE_ANNOTATION:
      return state.map((input, index) =>
        index === 1 ?
          {
            ...input,
            active_value: action.value
          }:
          input
      );

    case HighlightActionTypes.UPDATE_SECTION:
      return state.map((input, index) =>
        index === 0 ?
          {
            ...input,
            lines: action.payload.lines,
            annotations: action.payload.annotations,
            current_user: action.payload.current_user
          }:
          input
      );

    default:
      return state;

  }
};
