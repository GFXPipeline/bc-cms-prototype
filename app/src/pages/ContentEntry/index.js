import styled from "styled-components";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

const ContentContainer = styled.div`
  background-color: white;
  max-width: 800px;
  width: 60%;

  label {
    font-size: 13px;
    font-weight: 700;
  }
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  max-height: 44px;
`;

function ContentEntry() {
  return (
    <>
      <Header />
      <ContentContainer>
        <label htmlFor="content-search">Search by page name, ID, or URL</label>
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
      </ContentContainer>
    </>
  );
}

export default ContentEntry;
