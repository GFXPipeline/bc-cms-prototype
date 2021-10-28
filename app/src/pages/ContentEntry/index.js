import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
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

// CKEditor custom plugins
import ContactUs from "../../plugins/ContactUs/ContactUs";
import OnThisPage from "../../plugins/OnThisPage/OnThisPage";

// Global components
import { pageService } from "../../_services";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import ContactUsBox from "../../components/ContactUs";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

// Page components
import PageList from "./PageList";
import NavTabs from "./NavTabs";
import PageActions from "./PageActions";
import PageControlToolbar from "./PageControlToolbar";

// Page actions
import ClonePage from "./_actions/ClonePage";
import CreatePage from "./_actions/CreatePage";
import DeletePage from "./_actions/DeletePage";
import CancelEdits from "./_actions/CancelEdits";

// Reusable components input fields
import ContactUsInput from "./ReusableComponents/ContactUs";

// Main CKEditor instance configuration
const mainEditorConfiguration = {
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
    ContactUs,
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
    OnThisPage,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    TextTransformation,
  ],
  toolbar: [
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
    "|",
    "onThisPage",
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
    "|",
    "onThisPage",
  ],
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
  contactUs: {
    contactUsRenderer: (id, domElement) => {
      ReactDOM.render(<ContactUsBox id={id} />, domElement);
    },
  },
};

// Intro CKEditor instance
const introEditorConfiguration = {
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
    ContactUs,
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
    OnThisPage,
    Paragraph,
    PasteFromOffice,
    Table,
    TableToolbar,
    TextTransformation,
  ],
  blockToolbar: {
    items: ["bold", "italic", "link"],
  },
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
  contactUs: {
    contactUsRenderer: (id, domElement) => {
      ReactDOM.render(<ContactUsBox id={id} />, domElement);
    },
  },
};

const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 0;
  width: 100%;

  div.ck-read-only {
    color: #555555;

    &:hover {
      cursor: not-allowed;
    }
  }

  div.ck-editor {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    div.ck-editor__main {
      overflow: hidden;

      div.ck-editor__editable {
        max-height: 100%;
        overflow: auto;
      }
    }
  }
`;

const LeftPanel = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 368px;
  overflow: hidden;

  &.scroll {
    overflow-y: auto;
  }

  div.top {
    label {
      font-size: 13px;
      font-weight: 700;
    }

    &.page-list {
      padding: 13px;
    }

    &.edit {
      display: flex;
      flex-direction: column;
      padding: 34px;

      button {
        margin: 0 auto 14px 0;
      }

      label {
        margin: 0 0 8px 0;
      }

      input[type="text"] {
        margin: 0 0 13px 0;
      }

      div.ck.ck-rounded-corners.ck-editor__editable {
        border: 2px solid #3e3e3e;
        border-radius: 0;
        height: 120px;
        margin: 0 0 13px 0;
      }

      select {
        margin: 0 0 13px 0;
      }
    }
  }
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  max-height: 44px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 368px);
`;

function ContentEntry() {
  // Open page details
  const { id } = useParams();
  const [data, setData] = useState(id ? "(Fetching page data)" : "");
  const [title, setTitle] = useState(id ? "(Fetching page title)" : "");
  const [navTitle, setNavTitle] = useState(id ? "(Fetching nav title)" : "");
  const [intro, setIntro] = useState(id ? "(Fetching page intro)" : "");

  // Reusable components
  const [isOnThisPage, setIsOnThisPage] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  // Meta
  const [editor, setEditor] = useState(null);
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [tab, setTab] = useState("page");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contactUsId, setContactUsId] = useState(null);

  // Modals
  const [modalClonePageOpen, setModalClonePageOpen] = useState(false);
  const [modalCreatePageOpen, setModalCreatePageOpen] = useState(false);
  const [modalDeletePageOpen, setModalDeletePageOpen] = useState(false);
  const [modalCancelEditsOpen, setModalCancelEditsOpen] = useState(false);

  function getPageIdForModal() {
    // In edit mode, the page that is loaded into the CKEditor instance is
    // the one users will be acting on by using the lower menu buttons
    if (isEditMode) {
      return id;
    }

    return selectedPages.length > 0 ? selectedPages[0] : id;
  }

  function getUpdatedPageList() {
    pageService
      .getPageList()
      .then((pages) => {
        setPages(pages);
      })
      .catch((error) => {
        setIsError(true);
        throw error;
      });
  }

  function handleBackToContentList() {
    getUpdatedPageList();
    setIsEditMode(false);
  }

  function updatePageListAndClearSelections() {
    getUpdatedPageList();
    setSelectedPages([]);
  }

  function savePage() {
    setIsSaving(true);

    pageService
      .update({ id, data, intro, isOnThisPage, title, navTitle })
      .then((success) => {
        console.log("Success saving page update: ", success);
        setIsSaving(false);
      })
      .catch((error) => {
        console.log("Error saving page update: ", error);
        setIsSaving(false);
      });
  }

  async function clearEdits() {
    // TODO: Before over-writing current state, should in-progress edits be
    //       saved to a temporary table that the user can review?

    try {
      const response = await pageService.read(id);

      setData(response?.data || "");
      setTitle(response?.title || "");
      setNavTitle(response?.nav_title || "");
      setIntro(response?.intro || "");
      setIsOnThisPage(response?.is_on_this_page || false);
      setIsEditMode(false);

      return response;
    } catch (error) {
      console.log("error in ContentEntry pageService catch: ", error);
      throw error;
    }
  }

  // Populate page list
  useEffect(() => {
    getUpdatedPageList();
  }, []);

  // Get the data for the selected page
  useEffect(() => {
    if (id) {
      pageService
        .read(id)
        .then((response) => {
          setData(response?.data || "");
          setTitle(response?.title || "");
          setNavTitle(response?.nav_title || "");
          setIntro(response?.intro || "");
          setIsOnThisPage(response?.is_on_this_page || false);
        })
        .catch((error) => {
          console.log(
            "error in ContentEntry pageService first load catch: ",
            error
          );
          setIsError(true);
        });
    }
  }, [id]);

  return (
    <Page>
      <Header />
      <ContentContainer>
        {isEditMode ? (
          <LeftPanel className="scroll">
            <div className="top edit">
              <ButtonLink onClick={handleBackToContentList}>
                ← Back to content page list
              </ButtonLink>
              <label htmlFor="page-title">Page title:</label>
              <TextInput
                id="page-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="nav-title">Nav title:</label>
              <TextInput
                id="nav-title"
                value={navTitle}
                onChange={(e) => setNavTitle(e.target.value)}
              />
              <label htmlFor="page-intro">Page Intro:</label>
              <CKEditor
                id="page-intro"
                editor={ClassicEditor}
                config={introEditorConfiguration}
                data={intro}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const intro = editor.getData();
                  console.log({ event, editor, intro });
                  setIntro(intro);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              <label htmlFor="language">Language</label>
              <Select
                id="language"
                options={[{ value: "en", label: "English" }]}
                disabled // TODO: Enable and populate this field when multi-lingual is designed
              />
              {/* Hide the On This Page checkbox as this functionality is
              contained in the editor itself now. */}
              {/* <div>
                <label htmlFor="on-this-page">On this page: </label>
                <input
                  id="on-this-page"
                  type="checkbox"
                  checked={isOnThisPage}
                  onChange={(e) => setIsOnThisPage(!isOnThisPage)}
                />
              </div> */}
            </div>
            <ContactUsInput
              onClick={() => editor?.execute("insertContactUs", contactUsId)}
              isOpen={isContactUsOpen}
              setIsOpen={setIsContactUsOpen}
              contactUsId={contactUsId}
              setContactUsId={setContactUsId}
            />
          </LeftPanel>
        ) : (
          <LeftPanel>
            <div className="top page-list">
              <label htmlFor="content-search">
                Search by page name, ID, or URL
              </label>
              <InputContainer>
                <TextInput id="content-search" />
                <Button primary>Search</Button>
              </InputContainer>
              <label htmlFor="content-list-view">List view</label>
              <InputContainer>
                <Select
                  id="content-list-view"
                  name="content-list-view"
                  options={[{ id: "view-all", label: "View all" }]}
                />
              </InputContainer>
            </div>
            <PageControlToolbar
              selectedPages={selectedPages}
              setModalClonePageOpen={setModalClonePageOpen}
              setModalCreatePageOpen={setModalCreatePageOpen}
              setModalDeletePageOpen={setModalDeletePageOpen}
            />
            <PageList
              isError={isError}
              pages={pages}
              selected={selectedPages}
              setSelected={setSelectedPages}
            />
          </LeftPanel>
        )}
        <RightPanel>
          <NavTabs
            tabs={[
              { id: "page", label: "Page" },
              { id: "settings", label: "Settings", disabled: true },
              { id: "metadata", label: "Metadata", disabled: true },
              { id: "usage", label: "Usage", disabled: true },
              { id: "security", label: "Security", disabled: true },
              { id: "history", label: "History", disabled: true },
            ]}
            currentTab={tab}
            setCurrentTab={setTab}
          />
          <CKEditor
            id="main-editor"
            editor={ClassicEditor}
            config={mainEditorConfiguration}
            disabled={!isEditMode}
            data={data}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
              setEditor(editor);

              // if (process.env.NODE_ENV === "development") {
              //   CKEditorInspector.attach(editor);
              // }
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setData(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          {!isEditMode && (
            <PageActions
              isPageOpen={id ? true : false}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              isSaving={isSaving}
              onClone={() => setModalClonePageOpen(true)}
            />
          )}
        </RightPanel>
      </ContentContainer>
      {isEditMode && (
        <PageActions
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onSave={savePage}
          onCancel={() => setModalCancelEditsOpen(true)}
          onClone={() => setModalClonePageOpen(true)}
          onDelete={() => setModalDeletePageOpen(true)}
        />
      )}
      <ClonePage
        id={getPageIdForModal()}
        isOpen={modalClonePageOpen}
        setIsOpen={setModalClonePageOpen}
        onAfterClose={getUpdatedPageList}
      />
      <CreatePage
        isOpen={modalCreatePageOpen}
        setIsOpen={setModalCreatePageOpen}
        onAfterClose={getUpdatedPageList}
      />
      <DeletePage
        id={getPageIdForModal()}
        isOpen={modalDeletePageOpen}
        setIsOpen={setModalDeletePageOpen}
        onAfterClose={updatePageListAndClearSelections}
      />
      <CancelEdits
        isOpen={modalCancelEditsOpen}
        setIsOpen={setModalCancelEditsOpen}
        clearEdits={clearEdits}
      />
    </Page>
  );
}

export default ContentEntry;
