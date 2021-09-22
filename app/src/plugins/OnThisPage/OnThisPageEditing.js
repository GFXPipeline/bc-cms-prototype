// OnThisPage/OnThisPageEditing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

import ListIcon from "../../assets/fa-list.svg";

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

    editor.ui.componentFactory.add("onThisPage", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "On this page",
        icon: ListIcon,
        withText: "Insert On this page",
        tooltip: true,
      });

      view.on("execute", () => {
        const root = editor.model.document.getRoot();
        const range = editor.model.createRangeIn(root);
        const headers = [];

        // Iterate through all elements in the document and get H2 headings.
        // Note that "heading1" in the CKEditor model refers to H2:
        // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
        for (const value of range.getWalker({ ignoreElementEnd: true })) {
          if (value.item.is("element") && value.item.name.match(/^heading1/)) {
            headers.unshift({
              id: value.item.getAttribute("id"),
              text: value.item.getChild(0)?.data,
            });
          }
        }

        // Insert the On this Page heading and a list of links
        editor.model.change((writer) => {
          if (headers?.length > 0) {
            const onThisPageContainer = writer.createElement("onThisPage");
            const onThisPageList = writer.createElement("onThisPageList");

            for (const header of headers) {
              const listItem = writer.createElement("listItem", {
                listType: "bulleted",
                listIndent: 0,
              });

              writer.appendText(
                header?.text?.toString(),
                { linkHref: `#${header?.id}` },
                listItem
              );

              writer.insert(listItem, onThisPageList);
            }

            writer.insert(onThisPageList, onThisPageContainer);
            const onThisPageHeading = writer.createElement("onThisPageTitle");
            writer.appendText("On this page", onThisPageHeading);
            writer.insert(onThisPageHeading, onThisPageContainer);
            writer.insert(onThisPageContainer, root);
          }
        });
      });

      return view;
    });

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
