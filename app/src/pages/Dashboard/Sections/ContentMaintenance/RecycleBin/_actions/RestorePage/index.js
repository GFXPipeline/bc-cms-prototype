import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Global components
import Button from "../../../../../../../components/Button";
import PageLocationSelector from "../../../../../../../components/PageLocationSelector";
import Modal from "../../../../../../../components/Modal";
import TextInput from "../../../../../../../components/TextInput";
import { pageService } from "../../../../../../../_services";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    width: 100%;
    max-width: 550px;

    h1 {
      margin: 0 0 22px 0;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    div.location {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      width: 100%;

      input[type="text"] {
        flex-grow: 1;
      }
    }

    div.reason {
      display: flex;
      flex-direction: column;
      margin: 0 0 16px 0;

      textarea {
        border: 2px solid #3e3e3e;
        display: block;
        font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
        font-size: 16px;
        padding: 13px 16px;
        resize: none;

        &::placeholder {
          color: #949494;
        }

        &:disabled {
          background-color: #f9f9f9;
          border-color: #6f6f6f;
          cursor: not-allowed;
        }
      }
    }

    div.control-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;

      a {
        color: #2d4821;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          text-decoration: none;
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
  }
`;

function RestorePage({
  id,
  isOpen,
  parentPageId,
  setIsOpen,
  onAfterClose,
  title,
}) {
  const [locationText, setLocationText] = useState(
    parentPageId ? "(Fetching page location)" : ""
  );
  const [desiredParentPageId, setDesiredParentPageId] = useState(
    parentPageId ? parentPageId : ""
  );
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [pageTree, setPageTree] = useState(null);
  const [openPageBranches, setOpenPageBranches] = useState([]);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleCleanup() {
    setReason("");
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setIsOpen(false);
  }

  function handleRestore() {
    setIsSubmitting(true);

    pageService
      .undelete({
        id: id,
        parentPageId: desiredParentPageId,
        reason: reason,
      })
      .then((success) => {
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setIsError(true);
      });
  }

  function handleSelect(e) {
    setDesiredParentPageId(e.target.id);
  }

  // Get parent page page for location text field
  useEffect(() => {
    if (desiredParentPageId) {
      pageService
        .getPath(desiredParentPageId)
        .then((path) => {
          console.log("path in PageLocation: ", path);
          setLocationText(path);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [desiredParentPageId]);

  // Get page tree for location modal
  useEffect(() => {
    pageService
      .getPageTree()
      .then((pageTree) => {
        setPageTree(pageTree);
        if (
          pageTree &&
          typeof pageTree === "object" &&
          Object.keys(pageTree)?.length > 0
        ) {
          setOpenPageBranches([Object.keys(pageTree)?.[0]]);
        }
      })
      .catch((error) => {
        console.log("Error fetching page tree");
      });
  }, []);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <h1>Restore</h1>
      <label htmlFor="title">Page title:</label>
      <div className="location">
        <TextInput id="title" disabled value={title} />
      </div>
      <label htmlFor="location">Restore location: *</label>
      <div className="location">
        <TextInput id="location" disabled value={locationText} />
        <Button primary onClick={() => setIsLocationOpen(true)}>
          Browse
        </Button>
      </div>
      <div className="reason">
        <label htmlFor="reason">Reason to restore: *</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          required
          disabled={isSubmitting || isSuccess}
        />
      </div>
      <div className="control-buttons">
        <Button
          primary
          onClick={handleRestore}
          disabled={!reason || isSubmitting || isSuccess}
        >
          Restore
        </Button>
        <Button onClick={handleCleanup}>
          {isSuccess ? "Close" : "Cancel"}
        </Button>
      </div>
      {isSuccess && (
        <p className="success">
          Page has been restored. <Link to={`/content/${id}`}>Go to Edit</Link>
        </p>
      )}
      {isError && <p className="error">Error. Page failed to restore.</p>}
      <PageLocationSelector
        handleSelect={handleSelect}
        isOpen={isLocationOpen}
        openPageBranches={openPageBranches}
        pageTree={pageTree}
        selected={[desiredParentPageId]}
        setIsOpen={setIsLocationOpen}
        setOpenPageBranches={setOpenPageBranches}
        title={"Choose restore location"}
      />
    </StyledModal>
  );
}

export default RestorePage;
