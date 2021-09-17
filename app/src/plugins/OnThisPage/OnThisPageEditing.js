// OnThisPage/OnThisPageEditing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class OnThisPageEditing extends Plugin {
  init() {
    console.log("OnThisPageEditing#init() got called");

    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("onThisPage", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block",
    });

    schema.register("onThisPageTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "onThisPage",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "heading1",
    });

    schema.register("onThisPageDescription", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "onThisPage",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.elementToElement({
      model: "onThisPage",
      view: {
        name: "section",
        classes: "on-this-page",
      },
    });

    conversion.elementToElement({
      model: "onThisPageTitle",
      view: {
        name: "h2",
        classes: "on-this-page-title",
      },
    });

    conversion.elementToElement({
      model: "onThisPageDescription",
      view: {
        name: "div",
        classes: "on-this-page-description",
      },
    });
  }
}
