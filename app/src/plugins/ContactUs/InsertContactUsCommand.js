// ContactUs/InsertContactUsCommand.js

import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertContactUsCommand extends Command {
  execute(id) {
    this.editor.model.change((writer) => {
      // Insert <contactUs id="...">*</contactUs> at the current selection position
      // in a way which will result in creating a valid model structure.
      this.editor.model.insertContent(
        writer.createElement("contactUs", { id })
      );
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "contactUs"
    );

    this.isEnabled = allowedIn !== null;
  }
}
