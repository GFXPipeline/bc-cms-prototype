// ContactUs/ContactUsEditing.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import InsertContactUsCommand from "./InsertContactUsCommand";

export default class ContactUsEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertContactUs",
      new InsertContactUsCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("contactUs", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block",

      // Each ContactUs instance has an ID. A unique ID tells the application which
      // instance it represents and makes it possible to render it inside a widget.
      allowAttributes: ["id"],
    });
  }

  _defineConverters() {
    const editor = this.editor;
    const conversion = editor.conversion;
    const renderContactUs = editor.config.get("contactUs").contactUsRenderer;

    // <contactUs> converters ((data) view → model)
    conversion.for("upcast").elementToElement({
      view: {
        name: "section",
        classes: "contact-us",
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Read the "data-id" attribute from the view and set it as the "id" in the model.
        return modelWriter.createElement("contactUs", {
          id: viewElement.getAttribute("data-id"),
        });
      },
    });

    // <contactUs> converters (model → data view)
    conversion.for("dataDowncast").elementToElement({
      model: "contactUs",
      view: (modelElement, { writer: viewWriter }) => {
        // In the data view, the model <contactUs> corresponds to:
        //
        // <section class="contact-us" data-id="..."></section>
        return viewWriter.createEmptyElement("section", {
          class: "contact-us",
          "data-id": modelElement.getAttribute("id"),
        });
      },
    });

    // <contactUs> converters (model → editing view)
    conversion.for("editingDowncast").elementToElement({
      model: "contactUs",
      view: (modelElement, { writer: viewWriter }) => {
        // In the editing view, the model <contactUs> corresponds to:
        //
        // <section class="contact-us" data-id="...">
        //   <div class="contact-us__react-wrapper">
        //     <ContactUs /> (React component)
        //   </div>
        // </section>
        const id = modelElement.getAttribute("id");

        // The outermost <section class="contact-us" data-id="..."></section> element.
        const section = viewWriter.createContainerElement("section", {
          class: "contact-us",
          "data-id": id,
        });

        // The inner <div class="contact-us__react-wrapper"></div> element.
        // This element will host a React <ContactUs /> component.
        const reactWrapper = viewWriter.createRawElement(
          "div",
          {
            class: "contact-us__react-wrapper",
          },
          function (domElement) {
            // This the place where React renders the actual product preview hosted
            // by a UIElement in the view. You are using a function (renderer) passed as
            // editor.config.products#productRenderer.
            renderContactUs(id, domElement);
          }
        );

        viewWriter.insert(
          viewWriter.createPositionAt(section, 0),
          reactWrapper
        );

        return toWidget(section, viewWriter, { label: "Contact Us widget" });
      },
    });
  }
}
