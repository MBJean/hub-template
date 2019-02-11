import * as HighlightActionTypes from '../actiontypes/highlight';
import buildAnnotationObject from '../../../helpers/buildAnnotationObject';
import getCSRFToken from '../../../helpers/getCSRFToken';

export const onClickAnnotation = (annotations) => {
  return function (dispatch) {
    dispatch({
      type: HighlightActionTypes.UPDATE_ACTIVE_ANNOTATIONS,
      annotations
    });
  };
}

export const onClickAdd = () => {
  return {
    type: HighlightActionTypes.ACTIVATE_ADD_ANNOTATION
  };
}

export const onClickDelete = (annotation_id) => {
  return function (dispatch) {
    fetch(`/api/v1/annotation/${annotation_id}`, {
      method: 'DELETE',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'X-CSRF-Token': getCSRFToken()
      },
    })
    .then(
      response => response.status === 204 ? dispatch(resetState()): dispatch(errorHandler("on click delete")),
      error => error
    )
  };
}

export const onClickEdit = (annotation) => {
  return {
    type: HighlightActionTypes.ACTIVATE_EDIT_ANNOTATION,
    annotation
  };
}

export const errorHandler = (error) => {
  return {
    type: HighlightActionTypes.ERROR_HANDLER,
    error
  };
}

export const fetchSection = () => {
  return function (dispatch, getState) {
    return fetch(`/api/v1/section/${getState()[0].section_id}`)
      .then(
        response => response.json().then( json => {
          let output_json = {...json};
          output_json.lines.sort( (a, b) => a.id > b.id ? 1: -1 );
          dispatch(updateSection(output_json));
        }),
        error => dispatch(fetchFailure(error))
      );
  }
}

export const onChangeEditedAnnotation = (index, value) => {
  return {
    type: HighlightActionTypes.UPDATE_EDITED_ANNOTATION,
    index,
    value
  };
}

export const onMouseUpText = (options, current_user_id) => {
  return function (dispatch) {
    if (current_user_id !== "guest") {
      let annotation_object = buildAnnotationObject(options);
      if (annotation_object.error === null) {
        dispatch({
          type: HighlightActionTypes.ACTIVATE_NEW_ANNOTATION,
          new_annotation: annotation_object.response
        });
      }
    }
  };
}

export const resetState = () => {
  return function (dispatch) {
    dispatch({ type: HighlightActionTypes.RESET_STATE });
    dispatch(fetchSection());
  };
}

export const onSubmitEditedAnnotation = (ev, id, value) => {
  return function(dispatch) {
    ev.preventDefault();
    if (value.length > 0) {
      fetch(`/api/v1/annotation/${id}`, {
        body: JSON.stringify({"payload":
          {
            "value": value
          }
        }),
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          'X-CSRF-Token': getCSRFToken()
        },
        method: 'PUT',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(
        response => response.json().then( json => json.response === "success" ? dispatch(resetState()): dispatch(errorHandler("on submit editing annotation")) ),
        error => error
      )
    }
  }
}

export const onSubmitNewAnnotation = (ev, options) => {
  ev.preventDefault();
  return function (dispatch) {
    if (options.value.length > 0) {
      let payload = {
        ...options.annotation,
        content: options.value
      };
      fetch(`/api/v1/annotation`, {
        body: JSON.stringify({"payload": payload}),
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          'X-CSRF-Token': getCSRFToken()
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(
        response => response.json().then( json =>
          json.response === "success" ?
            dispatch(resetState()):
            dispatch(errorHandler("on submit new annotation"))
        ),
        error => error
      )
    }
  };
}

export const setSection = (section_id) => {
  return function (dispatch) {
    dispatch({
      type: HighlightActionTypes.SET_SECTION,
      id: section_id
    });
    dispatch(fetchSection());
  };
}

export const updateSection = (payload) => {
  return {
    type: HighlightActionTypes.UPDATE_SECTION,
    payload
  };
}
