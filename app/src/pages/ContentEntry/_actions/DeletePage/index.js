import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import BlockToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";

// Global components
import svgCalendar from "../../../../assets/noun-calendar.svg";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { pageService } from "../../../../_services";

// Plugins to include in the build.
const editorConfiguration = {
  plugins: [
    Essentials,
    UploadAdapter,
    Autoformat,
    BlockToolbar,
    Bold,
    Italic,
    BlockQuote,
    CKFinder,
    CloudServices,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    TextTransformation,
  ],
  blockToolbar: [
    "heading",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "uploadImage",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "|",
    "undo",
    "redo",
  ],
  toolbar: {
    items: ["bold", "italic", "link"],
  },
  image: {
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en",
};

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    width: 100%;
    max-width: 550px;

    form {
      h1 {
        margin: 0 0 22px 0;
      }

      div.page-title {
        margin: 0 0 16px 0;

        label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }
      }

      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin: 0 0 12px 0;

        label {
          cursor: pointer;
        }

        &.radio-delete-type {
          display: flex;
          flex-direction: column;

          div.radio-option {
            align-items: center;
            border: 1px solid transparent;
            display: flex;
            flex-direction: row;
            padding: 16px;

            &.selected {
              border: 1px solid #707070;
            }

            input[type="radio"] {
              margin: 0 15px 0 0;
            }

            div.label-description {
              span {
                font-size: 16px;
              }

              p {
                font-size: 13px;
                margin: 8px 0 0 0;
              }
            }
          }

          &.disabled {
            div.radio-option {
              input[type="radio"] {
                cursor: not-allowed;
              }

              div.label-description {
                label {
                  cursor: not-allowed;
                }
              }
            }
          }
        }
      }

      div.reason-for-deletion {
        display: flex;
        flex-direction: column;
        margin: 0 0 12px 0;

        label {
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        textarea {
          border: 2px solid #3e3e3e;
          display: block;
          font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
          font-size: 16px;
          padding: 13px 16px;
          resize: none;

          &::placeholder {
            color: #949494;
          }

          &:disabled {
            border-color: #6f6f6f;
            cursor: not-allowed;
          }
        }
      }

      div.set-time-and-date {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 0 25px 0;

        input[type="checkbox"],
        label {
          cursor: pointer;
        }

        label {
          span.checkbox-label {
            margin: 0 0 0 16px;
          }
        }

        div.date-and-time {
          display: flex;
          flex-direction: row;

          label {
            font-size: 13px;
          }

          div.date-select {
            display: flex;
            flex-direction: column;
            margin-right: 17px;

            div.react-datepicker-wrapper {
              border: 2px solid #3e3e3e;
              height: 48px;
              width: 144px;

              div.react-datepicker__input-container {
                input[type="text"] {
                  background-image: url(${svgCalendar});
                  background-position: right 16px top 50%;
                  background-repeat: no-repeat;
                  background-size: 20px 20px;
                  border: none;
                  font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
                  font-size: 16px;
                  height: 44px;
                  padding-left: 13px;
                  width: 140px;
                }
              }
            }

            &.disabled {
              div.react-datepicker-wrapper {
                border-color: #6f6f6f;

                div.react-datepicker__input-container {
                  input[type="text"] {
                    background: none;
                    color: #6f6f6f;
                    cursor: not-allowed;
                  }
                }
              }
            }
          }

          div.time-select {
            display: flex;
            flex-direction: column;

            label {
              font-size: 13px;
            }

            div.input-container {
              align-items: end;
              display: flex;
              flex-direction: row;
              height: 48px;

              input[type="time"] {
                border: 2px solid #3e3e3e;
                font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
                font-size: 16px;
                height: 48px;
                padding: 1px 13px;

                &:disabled {
                  border-color: #6f6f6f;
                  color: #6f6f6f;
                  cursor: not-allowed;
                }
              }
            }

            &.disabled {
              div.input-container {
                fieldset.radio-period {
                  label {
                    border-color: #6f6f6f;
                    color: #6f6f6f;
                    cursor: not-allowed;

                    &.selected {
                      background-color: #6f6f6f;
                      color: white;
                    }
                  }
                }
              }
            }
          }
        }

        &.disabled {
          label {
            cursor: not-allowed;

            input {
              cursor: not-allowed;
            }
          }
        }
      }

      div.request-notification {
        margin: 0 0 25px 0;

        label {
          span.checkbox-label {
            margin: 0 0 0 16px;
          }
        }

        &.disabled {
          label {
            cursor: not-allowed;

            input {
              cursor: not-allowed;
            }
          }
        }
      }

      div.message-to-subscribers {
        margin: 0 0 25px 0;

        label {
          display: inline-block;
          margin: 0 0 16px 0;

          span.checkbox-label {
            margin: 0 0 0 16px;
          }
        }

        &.disabled {
          label {
            cursor: not-allowed;

            input {
              cursor: not-allowed;
            }
          }
        }

        div.message-editor {
          label {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            margin: 0 0 12px 0;
          }

          div.ck {
            border: 2px solid #3e3e3e;
            border-radius: 0;
          }

          &.disabled {
            div.ck {
              border-color: #6f6f6f;
              color: #6f6f6f;
              cursor: not-allowed;
            }
          }
        }
      }

      div.control-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;

      a {
        color: #2d4821;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }
    }

    p.error {
      background-color: #f2dede;
      border: 1px solid #ebccd1;
      border-radius: 4px;
      color: #a12622;
      padding: 15px;
    }
  }
`;

function DeletePage({ id, isOpen, setIsOpen, onAfterClose }) {
  const [title, setTitle] = useState("(Fetching page title)");
  // TODO: Removal deleteType and associated logic when it is determined that
  //       users cannot perform a soft vs hard delete (only "delete").
  const [deleteType, setDeleteType] = useState("hard-delete");
  const [reason, setReason] = useState("");
  const [isDateRequired, setIsDateRequired] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const [isNotificationRequested, setIsNotificationRequested] = useState(false);
  const [isSubMsgRequested, setIsSubMsgRequested] = useState(false);
  const [subMsg, setSubMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: Remove separate time selector and use react-datepicker's built-in
  //       time selection (https://reactdatepicker.com/#example-select-time)
  function getDeleteTime() {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const timeString = `${year}-${month > 9 ? month : `0${month}`}-${
      dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`
    }T${time}`;

    return new Date(timeString);
  }

  function handleDeletePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    pageService
      .markForDeletion({
        id: id,
        deleteType: deleteType,
        reason: reason,
        isDeleteDateSet: isDateRequired,
        timeToDelete: getDeleteTime(),
        isNotificationRequested: isNotificationRequested,
        isSubscriberMessageSet: isSubMsgRequested,
        subscriberMessage: isSubMsgRequested ? subMsg : null,
      })
      .then((success) => {
        setIsSuccess(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsSubmitting(false);
        throw error;
      });
  }

  function handleCleanup() {
    setDeleteType("hard-delete");
    setReason("");
    setIsDateRequired(false);
    setDate(new Date());
    setTime("00:00");
    setIsNotificationRequested(false);
    setIsSubMsgRequested(false);
    setSubMsg("");
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setIsOpen(false);
  }

  // Get the data for the selected page
  useEffect(() => {
    if (id) {
      pageService
        .read(id)
        .then((response) => {
          setTitle(response?.title || "");
        })
        .catch((error) => {
          console.log("Error in DeletePage modal: ", error);
          setTitle("(Error fetching page title)");
        });
    }
  }, [id]);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
      contentLabel={"Delete"}
    >
      <form id="delete-page">
        <h1>Delete</h1>
        {/* TODO: Remove these fields and associated logic when delete function
        and data model have matured. */}
        {/* <fieldset
          className={
            isSubmitting || isSuccess
              ? "radio-delete-type disabled"
              : "radio-delete-type"
          }
        >
          <div
            className={
              deleteType === "soft-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="soft-delete"
              name="delete-type"
              value="soft-delete"
              checked={deleteType === "soft-delete"}
              onChange={() => setDeleteType("soft-delete")}
              disabled={isSubmitting || isSuccess}
            />
            <div className="label-description">
              <label htmlFor="soft-delete">Soft</label>
              <p>
                Page will be greyed out and inaccessible publicly. Will be hard
                deleted after a period of time.
              </p>
            </div>
          </div>
          <div
            className={
              deleteType === "hard-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="hard-delete"
              name="delete-type"
              value="hard-delete"
              checked={deleteType === "hard-delete"}
              onChange={() => setDeleteType("hard-delete")}
              disabled={isSubmitting || isSuccess}
            />
            <div className="label-description">
              <label htmlFor="hard-delete">Hard</label>
              <p>
                This will permanently delete the page and remove it from the
                content list.
              </p>
            </div>
          </div>
        </fieldset> */}
        <div className="page-title">
          <label htmlFor="title">Page title:</label>
          <TextInput id="title" value={title} disabled />
        </div>
        <div className="reason-for-deletion">
          <label>* Reason for deletion (mandatory)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={"Enter reason for deletion."}
            rows={3}
            required
            disabled={isSubmitting || isSuccess}
          />
        </div>
        <div
          className={
            isSubmitting || isSuccess
              ? "set-time-and-date disabled"
              : "set-time-and-date"
          }
        >
          <label>
            <input
              type="checkbox"
              checked={isDateRequired}
              onChange={(e) => setIsDateRequired(!isDateRequired)}
              disabled={isSubmitting || isSuccess}
            />
            <span className="checkbox-label">Set time and date</span>
          </label>
          <div className="date-and-time">
            <div
              className={
                isDateRequired ? "date-select" : "date-select disabled"
              }
            >
              <label htmlFor="date-picker">Date</label>
              <DatePicker
                id={"date-picker"}
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                disabled={!isDateRequired || isSubmitting || isSuccess}
              />
            </div>
            <div
              className={
                isDateRequired ? "time-select" : "time-select disabled"
              }
            >
              <label htmlFor="time">Time</label>
              <div className="input-container">
                <input
                  type="time"
                  id="time"
                  name="time"
                  min="00:00"
                  max="24:00"
                  required={isDateRequired}
                  disabled={!isDateRequired || isSubmitting || isSuccess}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            isSubmitting || isSuccess
              ? "request-notification disabled"
              : "request-notification"
          }
        >
          <label>
            <input
              type="checkbox"
              checked={isNotificationRequested}
              onChange={(e) =>
                setIsNotificationRequested(!isNotificationRequested)
              }
              disabled={isSubmitting || isSuccess}
            />
            <span className="checkbox-label">
              Receive notification when deleted
            </span>
          </label>
        </div>
        <div
          className={
            isSubmitting || isSuccess
              ? "message-to-subscribers disabled"
              : "message-to-subscribers"
          }
        >
          <label>
            <input
              type="checkbox"
              checked={isSubMsgRequested}
              onChange={(e) => setIsSubMsgRequested(!isSubMsgRequested)}
              disabled={isSubmitting || isSuccess}
            />
            <span className="checkbox-label">Add message to subscribers</span>
          </label>
          <div
            className={
              isSubMsgRequested ? "message-editor" : "message-editor disabled"
            }
          >
            <label htmlFor="message-to-subscriber">
              Message to subscribers
            </label>
            <CKEditor
              id="message-to-subscribers"
              editor={BalloonEditor}
              config={editorConfiguration}
              data={subMsg}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const msg = editor.getData();
                console.log({ event, editor, msg });
                setSubMsg(msg);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
              disabled={!isSubMsgRequested || isSubmitting || isSuccess}
            />
          </div>
        </div>
        <div className="control-buttons">
          <Button
            onClick={(e) => handleDeletePage(e)}
            primary
            disabled={!reason || isSubmitting || isSuccess}
          >
            Delete
          </Button>
          <Button onClick={handleCleanup} disabled={isSubmitting}>
            {isSuccess ? "Close" : "Cancel"}
          </Button>
        </div>
      </form>
      {isError && (
        <p className="error">Error attempting to mark page for deletion</p>
      )}
      {isSuccess && (
        <>
          <p className="success">
            This page has been moved to your{" "}
            <RouterLink to={"/content-maintenance"}>Recycle Bin</RouterLink>.
          </p>
          <Button primary onClick={handleCleanup}>
            Close this dialog
          </Button>
        </>
      )}
    </StyledModal>
  );
}

export default DeletePage;
