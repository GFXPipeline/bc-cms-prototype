import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";
import styled from "styled-components";

// Global components
import { pageService } from "../../_services";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

// Page components
import PageList from "./PageList";
import NavTabs from "./NavTabs";
import PageActions from "./PageActions";

// Page actions
import ClonePage from "./_actions/ClonePage";
import CreatePage from "./_actions/CreatePage";
import DeletePage from "./_actions/DeletePage";
import CancelEdits from "./_actions/CancelEdits";

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
`;

const LeftPanel = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 368px;
  overflow: hidden;

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

const PageControlToolbar = styled.div`
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    height: 44px;

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      color: #949494;
      cursor: not-allowed;
      text-decoration: none;
    }
  }
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

  // Meta
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [tab, setTab] = useState("page");
  const [isEditMode, setIsEditMode] = useState(false);

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
    pageService
      .update({ id, data, intro, isOnThisPage, title, navTitle })
      .then((success) => {
        console.log("Success saving page update: ", success);
      })
      .catch((error) => {
        console.log("Error saving page update: ", error);
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
          <LeftPanel>
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
                editor={BalloonBlockEditor}
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
              <div>
                <label htmlFor="on-this-page">On this page: </label>
                <input
                  id="on-this-page"
                  type="checkbox"
                  checked={isOnThisPage}
                  onChange={(e) => setIsOnThisPage(!isOnThisPage)}
                />
              </div>
            </div>
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
            <PageControlToolbar>
              <Dropdown
                id="content-entry-create"
                label="Create"
                options={[
                  {
                    id: "new-page",
                    label: "New page",
                    action: () => {
                      setModalCreatePageOpen(true);
                    },
                  },
                  {
                    id: "clone-page",
                    label: "Clone selected page",
                    action: () => {
                      setModalClonePageOpen(true);
                    },
                    disabled: selectedPages?.length !== 1,
                  },
                  {
                    id: "clone-page-with-children",
                    label: "Clone selected page with children",
                    action: () =>
                      alert("Clone selected page with children action"),
                    disabled: selectedPages?.length !== 1,
                  },
                  {
                    id: "new-external-link",
                    label: "New external link",
                    action: () => alert("New external link action"),
                    disabled: true,
                  },
                ]}
              />
              <Dropdown
                id="content-entry-lock"
                disabled={selectedPages?.length === 0}
                label="Lock"
                options={[
                  {
                    id: "lock-page",
                    label: "Lock page",
                    action: () => alert("Lock page action"),
                    disabled: true,
                  },
                  {
                    id: "unlock-page",
                    label: "Unlock page",
                    action: () => alert("Unlock page action"),
                    disabled: true,
                  },
                ]}
              />
              <button disabled onClick={() => alert("Move action")}>
                Move
              </button>
              <Dropdown
                id="content-entry-publish"
                disabled={selectedPages?.length === 0}
                label="Publish"
                options={[
                  {
                    id: "publish-left-navigation",
                    label: "Publish left navigation",
                    action: () => alert("Publish left navigation action"),
                    disabled: true,
                  },
                  {
                    id: "publish-selected",
                    label: "Publish selected",
                    action: () => alert("Publish selected action"),
                    disabled: true,
                  },
                  {
                    id: "publish-selected-with-children",
                    label: "Publish selected with children",
                    action: () =>
                      alert("Publish selected with children action"),
                    disabled: true,
                  },
                  {
                    id: "unpublish-selected",
                    label: "Unpublish selected",
                    action: () => alert("Unpublish selected action"),
                    disabled: true,
                  },
                ]}
              />
              <Dropdown
                id="content-entry-tag"
                label="Tag"
                disabled={selectedPages?.length === 0}
                options={[
                  {
                    id: "bulk-tag-selected",
                    label: "Bulk tag selected",
                    action: () => alert("Bulk tag selected action"),
                    disabled: true,
                  },
                  {
                    id: "bulk-tag-metadata",
                    label:
                      "Bulk tag metadata and terms to selected and their children",
                    action: () => alert("Bulk tag metadata action"),
                    disabled: true,
                  },
                ]}
              />
              <button
                onClick={() => setModalDeletePageOpen(true)}
                disabled={selectedPages.length !== 1}
              >
                Delete
              </button>
            </PageControlToolbar>
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
            editor={BalloonBlockEditor}
            disabled={!isEditMode}
            data={data}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
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
