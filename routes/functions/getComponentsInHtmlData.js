const cheerio = require("cheerio");

function getComponentsInHtmlData(data) {
  const $ = cheerio.load(data);
  const componentIds = [];

  // CKEditor5 plugins are inserted using HTML like:
  //   <section data-id="COMPONENT_GUID"></section>
  $("section[data-id]").each((index, element) => {
    if (element?.attribs?.["data-id"]) {
      componentIds.push(element?.attribs?.["data-id"]);
    }
  });

  return componentIds;
}

module.exports = getComponentsInHtmlData;
