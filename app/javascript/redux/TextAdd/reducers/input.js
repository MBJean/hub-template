import * as InputActionTypes from '../actiontypes/input';

const initialState = [
  {
    id: "text",
    isActive: false,
    isError: false,
    error: "",
    selected: {},
    value: []
  }
];

export default function Input(state = initialState, action) {
  switch(action.type) {

    case InputActionTypes.UPDATE_VALUE:
      return state.map((input, index) =>
        index === action.index ?
          {...input, value: action.arr_value}:
          input
      );

    default:
      return state;

  }
};
