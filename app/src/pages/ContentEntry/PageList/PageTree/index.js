import { Link } from "react-router-dom";
import styled from "styled-components";

import Icon from "../../../../components/Icon";

const StyledList = styled.ul`
  background-color: white;
  padding: 0 0 0 20px;
  list-style: none;

  &.top {
    padding-left: 0px; // Only the top level list needs no padding for alignment
  }

  li {
    div.container {
      display: flex;
      flex-direction: row;
      margin: 0 0 8px 0;
      padding: 4px 13px;

      &:hover {
        background-color: #e6e6e6;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        height: 24px;
        margin: 0 12px 0 0;
        padding: 0;
        width: 24px;

        svg {
          height: 24px;
          width: 24px;
        }

        &:hover {
          background-color: #d6d6d6;
        }
      }

      span.spacer {
        display: inline-block;
        min-width: 36px; // width + margin of button
      }

      a {
        color: #313132;
        display: block;
        list-style: none;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        white-space: nowrap;

        &:hover {
          text-decoration: underline;
        }
      }

      input[type="checkbox"] {
        margin-left: auto;
      }
    }
  }
`;

function TreeItem({
  page,
  handleSelect,
  openPageBranches,
  selected,
  setOpenPageBranches,
  setSelected,
}) {
  const hasChildren = Object.keys(page?.children).length > 0;
  const isOpen = openPageBranches?.includes(page?.id);

  function handleToggleOpen(id) {
    if (!isOpen) {
      setOpenPageBranches([...openPageBranches, id]);
    } else {
      let newOpen = [...openPageBranches];
      newOpen.splice(newOpen.indexOf(id), 1);
      setOpenPageBranches(newOpen);
    }
  }

  return (
    <li key={page?.id}>
      <div className="container">
        {hasChildren ? (
          <button
            onClick={() => {
              handleToggleOpen(page?.id);
            }}
          >
            {isOpen ? (
              <Icon id="ionic-ios-arrow-down.svg" />
            ) : (
              <Icon id="ionic-ios-arrow-forward.svg" />
            )}
          </button>
        ) : (
          <span className="spacer" />
        )}
        <Link to={`/content/${page?.id}`} title={page?.nav_title}>
          {page?.nav_title}
        </Link>
        <input
          type="checkbox"
          checked={selected?.includes(page?.id)}
          value={page?.id}
          id={page?.id}
          onChange={(e) => handleSelect(e)}
        />
      </div>
      {isOpen &&
        page?.children &&
        typeof page?.children === "object" &&
        Object.keys(page?.children).length > 0 && (
          <StyledList>
            {Object.keys(page.children).map((childPageKey) => {
              return (
                <TreeItem
                  key={`tree-item-${childPageKey}`}
                  page={page.children[childPageKey]}
                  handleSelect={handleSelect}
                  openPageBranches={openPageBranches}
                  selected={selected}
                  setOpenPageBranches={setOpenPageBranches}
                  setSelected={setSelected}
                />
              );
            })}
          </StyledList>
        )}
    </li>
  );
}

function PageTree({
  data,
  handleSelect,
  openPageBranches,
  selected,
  setOpenPageBranches,
  setSelected,
}) {
  const rootPageKeys = Object.keys(data);

  return (
    <StyledList className="top">
      {rootPageKeys.map((pageKey) => {
        return (
          <TreeItem
            key={`tree-item-${pageKey}`}
            page={data[pageKey]}
            handleSelect={handleSelect}
            openPageBranches={openPageBranches}
            selected={selected}
            setOpenPageBranches={setOpenPageBranches}
            setSelected={setSelected}
          />
        );
      })}
    </StyledList>
  );
}

export default PageTree;
