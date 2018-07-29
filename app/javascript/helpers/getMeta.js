// description: helper to read CSRF token in React components

const getMeta = () => {
  let metas = document.getElementsByTagName('meta');
  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") == "csrf-token") {
      return metas[i].getAttribute("content");
    }
  }
  return "";
}

export default getMeta;
