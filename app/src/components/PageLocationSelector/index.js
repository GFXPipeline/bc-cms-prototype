import styled from "styled-components";

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

    form {
      h1 {
        margin: 0 0 36px 0;
      }

      div.page-title {
        margin: 0 0 16px 0;

        label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }
      }

      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin: 0 0 25px 0;

        label {
          cursor: pointer;
        }

        input {
          cursor: pointer;
          margin-right: 16px;

          &:disabled {
            cursor: not-allowed;
          }
        }

        &.disabled {
          label {
            cursor: not-allowed;
          }
        }

        &.radio-fieldset {
          display: flex;
          flex-direction: column;

          div.radio-group {
            margin: 0 0 25px 70px;

            input:disabled,
            label.disabled {
              cursor: not-allowed;
            }
          }
        }

        &.number-of-copies {
          display: flex;
          flex-direction: column;

          label {
            font-size: 13px;
            margin-bottom: 8px;
          }

          input {
            height: 44px;
            width: 50px;
          }
        }

        &.control-where-to-clone {
          display: block;

          label {
            display: block;
            font-size: 13px;
            margin-bottom: 8px;
          }

          div.input-container {
            display: flex;
            flex-direction: row;
            width: 100%;

            input {
              height: 44px;
              margin: 0;
            }
          }
        }
      }

      div.control-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
  setSelected,
  title,
}) {
  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      {title && <h1>{title}</h1>}
      <PageTree
        data={pageTree}
        handleSelect={handleSelect}
        openPageBranches={openPageBranches}
        selected={selected}
        setOpenPageBranches={setOpenPageBranches}
        setSelected={setSelected}
      />
    </StyledModal>
  );
}

export default PageLocationSelector;
