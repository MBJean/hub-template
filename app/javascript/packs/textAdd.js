// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import Hub from '../redux/TextAdd/containers/Hub';
import InputReducer from '../redux/TextAdd/reducers/input';

const STORE = createStore(
  InputReducer,
  applyMiddleware(thunkMiddleware)
);
ReactDOM.render(
  <Provider store={STORE}>
    <Hub />
  </Provider>,
  document.getElementById('TextAdd'));
