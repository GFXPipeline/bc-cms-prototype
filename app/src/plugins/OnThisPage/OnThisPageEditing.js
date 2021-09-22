// OnThisPage/OnThisPageEditing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

import InsertOnThisPageCommand from "./InsertOnThisPageCommand";

export default class OnThisPageEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("OnThisPageEditing#init() got called");

    const editor = this.editor;
    const conversion = editor.conversion;
    const schema = editor.model.schema;

    // Get information about headings from the editor's configuration.
    const headings = editor.config.get("heading").options;

    this._setupConversion(conversion, schema, headings);
    this._defineSchema();
    this._defineConverters();
    editor.commands.add(
      "insertOnThisPage",
      new InsertOnThisPageCommand(editor)
    );
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

    schema.register("onThisPageList", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "onThisPage",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <onThisPage> converters
    conversion.for("upcast").elementToElement({
      model: "onThisPage",
      view: {
        name: "section",
        classes: "on-this-page",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "onThisPage",
      view: {
        name: "section",
        classes: "on-this-page",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "onThisPage",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("section", {
          class: "on-this-page",
        });

        return toWidget(section, viewWriter, { label: "On this Page Widget" });
      },
    });

    // <onThisPageTitle> converters
    conversion.for("upcast").elementToElement({
      model: "onThisPageTitle",
      view: {
        name: "h2",
        classes: "on-this-page-title",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "onThisPageTitle",
      view: {
        name: "h2",
        classes: "on-this-page-title",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "onThisPageTitle",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const h2 = viewWriter.createEditableElement("h2", {
          class: "on-this-page-title",
        });

        // use toWidgetEditable to switch to contentEditable=true
        return toWidgetEditable(h2, viewWriter);
      },
    });

    // <onThisPageList> converters
    conversion.for("upcast").elementToElement({
      model: "onThisPageList",
      view: {
        name: "div",
        classes: "on-this-page-list",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "onThisPageList",
      view: {
        name: "div",
        classes: "on-this-page-list",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "onThisPageList",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement("div", {
          class: "on-this-page-list",
        });

        // use toWidgetEditable to switch to contentEditable=true
        return toWidgetEditable(div, viewWriter);
      },
    });
  }

  _setupConversion(conversion, schema, headings) {
    conversion.attributeToAttribute({ model: "id", view: "id" });

    // Extend conversion only for headings.
    for (const heading of headings) {
      if (heading.model.match(/^heading1/)) {
        schema.extend(heading.model, { allowAttributes: ["id"] });

        conversion.for("downcast").add((dispatcher) => {
          dispatcher.on(
            `insert:${heading.model}`,
            (evt, data, conversionApi) => {
              const modelElement = data.item;
              const headingText = modelElement?._children?._nodes?.[0]?._data;
              const id = headingText
                ?.toString()
                ?.toLowerCase()
                ?.replace(/[^\w\s]/gi, "") // Remove non-alphanumeric chars, preserve spaces
                ?.split(" ")
                ?.join("-");

              // Set attribute on the view element
              conversionApi.writer.setAttribute(
                "id",
                id,
                conversionApi.mapper.toViewElement(modelElement)
              );
              // Set attribute on the model element
              conversionApi.writer.setAttribute("id", id, modelElement);
            },
            { priority: "low" }
          );
        });
      }
    }
  }
}
