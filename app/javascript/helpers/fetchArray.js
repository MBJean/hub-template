import createPostBody from './createPostBody';

// description: takes an array of lemmata (strings), replaces each with the JSON result of a fetch to /dictionary

const fetchArray = (array) => array.map( entry =>
  fetch(`/api/v1/dictionary/${entry}/`)
  .then( res => {
    if (res.ok) { return res.json(); }
    throw new Error("Network response was not okay.");
  })
  .catch( err => err )
);

export default fetchArray;
