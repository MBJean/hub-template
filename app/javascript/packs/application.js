/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Highlight from '../widgets/Highlight/containers/Highlight';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import HighlightReducer from '../widgets/Highlight/reducers/highlight';
import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'
import App from '../widgets/Dictionary/app.vue';

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('turbolinks:load', () => {
    if (!!document.getElementById("vue-dictionary")) {
      const app = new Vue({
        el: '#vue-dictionary',
        template: '<App />',
        components: { App }
      });
      document.getElementById("activate-dictionary").addEventListener("click", function(ev) {
        ev.preventDefault();
        document.querySelector(".Dictionary").classList.toggle("Dictionary--active");
      });
    }
  })

  document.addEventListener('turbolinks:load', () => {
    if (!!document.getElementById("Highlight")) {
      let author_id = document.getElementById("Highlight").dataset.author;
      let text_id = document.getElementById("Highlight").dataset.text;
      let book_id = document.getElementById("Highlight").dataset.book;
      let section_id = document.getElementById("Highlight").dataset.section;
      const STORE = createStore(
        HighlightReducer,
        applyMiddleware(thunkMiddleware)
      );
      ReactDOM.render(
        <Provider store={STORE}>
          <Highlight
            options={
              {
                author_id: author_id,
                text_id: text_id,
                book_id: book_id,
                section_id: section_id
              }
            }
          />
        </Provider>,
        document.getElementById('Highlight'));
    }
  });
});
