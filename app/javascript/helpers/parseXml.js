// description: parses a set of dom elements out of string XML

const parseXml = (string, tag_name) => {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(string,"text/xml");
  return xmlDoc.getElementsByTagName(tag_name);
}

export default parseXml;
