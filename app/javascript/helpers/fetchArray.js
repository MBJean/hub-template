import createPostBody from './createPostBody';

// description: takes an array of lemmata (strings), replaces each with the JSON result of a fetch to /dictionary

const fetchArray = (array) => array.map( entry =>
  fetch("/dictionary", createPostBody(entry))
  .then( res => res.json() )
);

export default fetchArray;
