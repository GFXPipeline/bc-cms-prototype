import { useState } from "react";
import styled from "styled-components";

// Page components
import PageList from "./PageList";
import NavTabs from "./NavTabs";

// Global components
import Button from "../../components/Button";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

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
`;

function ContentEntry() {
  const [tab, setTab] = useState("page");

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
          {/* Editor */}
          {/* Control buttons */}
        </RightPanel>
      </ContentContainer>
    </>
  );
}

export default ContentEntry;
