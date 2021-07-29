import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";
import styled from "styled-components";

// Global components
import { pageService } from "../../_services";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

// Page components
import PageList from "./PageList";
import NavTabs from "./NavTabs";
import PageActions from "./PageActions";

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
  const [tab, setTab] = useState("page");

  useEffect(() => {
    if (id) {
      pageService
        .read(id)
        .then((response) => {
          setData(response.data);
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
            <button>Create</button>
            <button>Lock</button>
            <button>Move</button>
            <button>Publish</button>
            <button>Tag</button>
            <button>Delete</button>
          </PageControlToolbar>
          <PageList />
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
    </>
  );
}

export default ContentEntry;
