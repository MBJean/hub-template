import * as InputActionTypes from '../actiontypes/input';

export const updateValue = (index, value) => {
  let arr_value = value.split('\n');
  return {
    type: InputActionTypes.UPDATE_VALUE,
    index,
    arr_value
  };
}
