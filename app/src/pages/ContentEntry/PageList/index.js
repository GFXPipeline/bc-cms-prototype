import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  height: 100%;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 13px;

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

function PageList({ isError, pages, selected, setSelected }) {
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
      {pages?.length > 0 &&
        pages.map((page, index) => {
          return (
            <div
              key={`page-list-${index}`}
              className={
                page?.is_marked_for_deletion
                  ? "page-container marked-for-deletion"
                  : "page-container"
              }
            >
              {/* Clicking the page title link loads the page in the editor */}
              <Link to={`/content/${page?.id}`}>{page.title}</Link>

              {/* Selecting the checkbox(es) determines available actions */}
              <input
                type="checkbox"
                id={page?.id}
                value={page?.id}
                checked={selected.indexOf(page?.id) !== -1}
                onChange={(e) => handleSelect(e)}
              />
            </div>
          );
        })}
      {isError && <p className="error">Failed to fetch page list.</p>}
    </StyledDiv>
  );
}

export default PageList;
