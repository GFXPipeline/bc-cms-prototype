// OnThisPage/OnThisPage.js

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import OnThisPageEditing from "./OnThisPageEditing";
import OnThisPageUI from "./OnThisPageUI";

export default class OnThisPage extends Plugin {
  static get requires() {
    return [OnThisPageEditing, OnThisPageUI];
  }
}
