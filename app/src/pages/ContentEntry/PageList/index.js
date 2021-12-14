import { Link } from "react-router-dom";
import styled from "styled-components";

import PageTree from "../../../components/PageTree";

const StyledDiv = styled.div`
  height: 100%;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;

  div.page-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      color: #313132;
      display: block;
      height: 44px;
      line-height: 44px;
      list-style: none;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }

    &.marked-for-deletion {
      a {
        color: #949494;
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
`;

function PageList({
  isError,
  openPageBranches,
  pageTree,
  selected,
  setOpenPageBranches,
  setSelected,
}) {
  function handleSelect(event) {
    const id = event.target.id;
    const isAlreadySelected = Boolean(selected.indexOf(id) !== -1);

    // If no pages are currently selected, add the new page ID
    if (selected?.length === 0) {
      return setSelected([id]);
    }

    // If ctrl and meta keys are NOT down
    if (!event?.nativeEvent?.ctrlKey && !event?.nativeEvent?.metaKey) {
      // ... and page is already selected, de-select all pages
      if (isAlreadySelected) {
        return setSelected([]);
      }

      // ... or select only the current page
      return setSelected([id]);
    }

    // If ctrl or meta key is down, check selected and remove/add as necessary
    if (event?.nativeEvent?.ctrlKey || event?.nativeEvent?.metaKey) {
      let newSelection = [...selected];

      isAlreadySelected
        ? newSelection.splice(newSelection.indexOf(id), 1)
        : newSelection.push(id);

      return setSelected(newSelection);
    }
  }

  return (
    <StyledDiv>
      {pageTree &&
        typeof pageTree === "object" &&
        Object.getOwnPropertyNames(pageTree).length > 0 && (
          <PageTree
            data={pageTree}
            handleSelect={handleSelect}
            openPageBranches={openPageBranches}
            selected={selected}
            setOpenPageBranches={setOpenPageBranches}
            setSelected={setSelected}
          />
        )}
      {isError && <p className="error">Failed to fetch page list.</p>}
    </StyledDiv>
  );
}

export default PageList;
