// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Highlight from '../components/Highlight';
import test_json from '../../../lib/data/test_json.json';

document.addEventListener('DOMContentLoaded', () => {
  if (!!document.getElementById("Highlight")) {
    let author_id = document.getElementById("Highlight").dataset.author;
    let text_id = document.getElementById("Highlight").dataset.text;
    let book_id = document.getElementById("Highlight").dataset.book;
    let section_id = document.getElementById("Highlight").dataset.section;
    ReactDOM.render(
      <Highlight
        options={
          {
            author_id: author_id,
            text_id: text_id,
            book_id: book_id,
            section_id: section_id
          }
        }
      />, document.getElementById('Highlight'));
  }
})
