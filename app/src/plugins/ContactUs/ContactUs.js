// ContactUs/ContactUs.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ContactUsEditing from "./ContactUsEditing";
import ContactUsUI from "./ContactUsUI";

export default class ContactUs extends Plugin {
  static get requires() {
    return [ContactUsEditing, ContactUsUI];
  }
}
