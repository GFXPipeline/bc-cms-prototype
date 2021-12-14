import styled from "styled-components";

import Icon from "../Icon";
import Modal from "../Modal";
import PageTree from "../PageTree";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    height: 100%;
    width: 100%;
    max-height: 75vh;
    max-width: 600px;

    div.top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button.close {
        align-items: center;
        margin-left: auto;
        border: none;
        background-color: white;
        color: #707070;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        font-size: 48px;
        height: 62px;
        justify-content: space-around;
        padding: 0px;
        right: 30px;
        width: 62px;

        &:hover {
          background-color: #d6d6d6;
        }

        svg {
          color: #707070;
          width: 50px;
        }
      }
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;
    }

    p.error {
      background-color: #f2dede;
      border: 1px solid #ebccd1;
      border-radius: 4px;
      color: #a12622;
      padding: 15px;
    }
  }
`;

function PageLocationSelector({
  handleSelect,
  isOpen,
  onAfterClose,
  openPageBranches,
  pageTree,
  selected,
  setIsOpen,
  setOpenPageBranches,
  title,
}) {
  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <div className="top">
        {title && <h1>{title}</h1>}
        <button
          label="Close modal"
          className="close"
          onClick={() => setIsOpen(false)}
        >
          <Icon id="md-close.svg" />
        </button>
      </div>
      <PageTree
        data={pageTree}
        handleSelect={handleSelect}
        openPageBranches={openPageBranches}
        selected={selected}
        setOpenPageBranches={setOpenPageBranches}
      />
    </StyledModal>
  );
}

export default PageLocationSelector;
