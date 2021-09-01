import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";
import styled from "styled-components";

// Global components
import { pageService } from "../../_services";
import Button from "../../components/Button";
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

const ContentContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LeftPanel = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  max-width: 368px;

  div.top {
    padding: 13px;

    label {
      font-size: 13px;
      font-weight: 700;
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
  padding: 20px;
  width: calc(100% - 368px);
`;

function ContentEntry() {
  const { id } = useParams();
  const [data, setData] = useState(id ? "(Fetching page data)" : "");
  const [title, setTitle] = useState(
    id ? "(Fetching page title)" : "Page title"
  );
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [tab, setTab] = useState("page");

  // Modals
  const [modalClonePageOpen, setModalClonePageOpen] = useState(false);
  const [modalCreatePageOpen, setModalCreatePageOpen] = useState(false);
  const [modalDeletePageOpen, setModalDeletePageOpen] = useState(false);

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

  function updatePageListAndClearSelections() {
    getUpdatedPageList();
    setSelectedPages([]);
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
          setData(response.data || "");
          setTitle(response.title);
        })
        .catch((error) => {
          console.log("error in Editor pageService catch: ", error);
          setData("(Failed to fetch page data)");
          setIsError(true);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <ContentContainer>
        <LeftPanel>
          <div className="top">
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
                },
                {
                  id: "new-external-link",
                  label: "New external link",
                  action: () => alert("New external link action"),
                },
              ]}
            />
            <Dropdown
              id="content-entry-lock"
              label="Lock"
              options={[
                {
                  id: "lock-page",
                  label: "Lock page",
                  action: () => alert("Lock page action"),
                },
                {
                  id: "unlock-page",
                  label: "Unlock page",
                  action: () => alert("Unlock page action"),
                },
              ]}
            />
            <button onClick={() => alert("Move action")}>Move</button>
            <Dropdown
              id="content-entry-publish"
              label="Publish"
              options={[
                {
                  id: "publish-left-navigation",
                  label: "Publish left navigation",
                  action: () => alert("Publish left navigation action"),
                },
                {
                  id: "publish-selected",
                  label: "Publish selected",
                  action: () => alert("Publish selected action"),
                },
                {
                  id: "publish-selected-with-children",
                  label: "Publish selected with children",
                  action: () => alert("Publish selected with children action"),
                },
                {
                  id: "unpublish-selected",
                  label: "Unpublish selected",
                  action: () => alert("Unpublish selected action"),
                },
              ]}
            />
            <Dropdown
              id="content-entry-tag"
              label="Tag"
              options={[
                {
                  id: "bulk-tag-selected",
                  label: "Bulk tag selected",
                  action: () => alert("Bulk tag selected action"),
                },
                {
                  id: "bulk-tag-metadata",
                  label:
                    "Bulk tag metadata and terms to selected and their children",
                  action: () => alert("Bulk tag metadata action"),
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
        <RightPanel>
          <NavTabs
            tabs={[
              { id: "page", label: "Page" },
              { id: "settings", label: "Settings" },
              { id: "metadata", label: "Metadata" },
              { id: "usage", label: "Usage" },
              { id: "security", label: "Security" },
              { id: "history", label: "History" },
            ]}
            currentTab={tab}
            setCurrentTab={setTab}
          />
          <CKEditor
            editor={BalloonBlockEditor}
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
          <PageActions />
        </RightPanel>
      </ContentContainer>
      <ClonePage
        id={selectedPages[0]}
        isOpen={modalClonePageOpen}
        setIsOpen={setModalClonePageOpen}
      />
      <CreatePage
        isOpen={modalCreatePageOpen}
        setIsOpen={setModalCreatePageOpen}
        onAfterClose={getUpdatedPageList}
      />
      <DeletePage
        id={selectedPages[0]}
        isOpen={modalDeletePageOpen}
        setIsOpen={setModalDeletePageOpen}
        onAfterClose={updatePageListAndClearSelections}
      />
    </>
  );
}

export default ContentEntry;
