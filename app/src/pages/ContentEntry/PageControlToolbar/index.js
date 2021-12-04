import styled from "styled-components";

import DropdownSelect from "../../../components/DropdownSelect";

const StyledDiv = styled.div`
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

function PageControlToolbar({
  selectedPages,
  setModalClonePageOpen,
  setModalCreatePageOpen,
  setModalDeletePageOpen,
}) {
  return (
    <StyledDiv>
      <DropdownSelect
        id="content-entry-create"
        disabled={selectedPages?.length > 1}
        label="Create"
        options={[
          {
            id: "new-page",
            label: "New page",
            action: () => {
              setModalCreatePageOpen(true);
            },
            disabled: selectedPages?.length > 1,
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
            action: () => alert("Clone selected page with children action"),
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
      <DropdownSelect
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
      <DropdownSelect
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
            action: () => alert("Publish selected with children action"),
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
      <DropdownSelect
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
            label: "Bulk tag metadata and terms to selected and their children",
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
    </StyledDiv>
  );
}

export default PageControlToolbar;
