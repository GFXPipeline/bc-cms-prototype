// import { useEffect, useRef } from "react";
import styled from "styled-components";

// Global components & services
import { svgService } from "../../../../_services";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";

// Page components
import EditPanel from "../EditPanel";

const StyledDiv = styled.div`
  border: 5px solid #707070;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  div.component {
    padding: 18px 24px;

    ul {
      list-style: none;
      padding-left: 0;

      li {
        margin-bottom: 3px;

        span.prefix {
          font-weight: 700;
        }

        svg {
          margin-right: 16px;
          width: 14px;
        }
      }
    }
  }

  button#edit-component {
    height: 44px;
    padding: 0;
    width: 44px;
  }
`;

function ComponentPreview({
  contactItems,
  handleSave,
  id,
  intro,
  isCancelling,
  isEditMode,
  isErrorSaving,
  isSaving,
  setContactItems,
  setIntro,
  setIsEditMode,
  setIsModalCancelOpen,
  setTitle,
  title,
}) {
  return (
    <StyledDiv>
      <div className="component">
        {title && <h1>{title}</h1>}
        {intro && <div dangerouslySetInnerHTML={{ __html: intro }} />}
        {contactItems &&
          Array.isArray(contactItems) &&
          contactItems.length > 0 && (
            <ul>
              {contactItems.map((item, index) => {
                return (
                  <li key={index}>
                    <Icon id={svgService.getContactSvgId(item?.option_id)} />
                    <span className="prefix">{item?.label_prefix}:</span>{" "}
                    <span className="value">{item?.data}</span>
                  </li>
                );
              })}
            </ul>
          )}
      </div>
      <Button
        onClick={() => setIsEditMode(!isEditMode)}
        id="edit-component"
        aria-label="Edit component"
        primary
      >
        <Icon id="fa-cog.svg" />
      </Button>
      {isEditMode && (
        <EditPanel
          handleSave={handleSave}
          id={id}
          intro={intro}
          isCancelling={isCancelling}
          isEditMode={isEditMode}
          isErrorSaving={isErrorSaving}
          isSaving={isSaving}
          contactItems={contactItems}
          setContactItems={setContactItems}
          setIntro={setIntro}
          setIsEditMode={setIsEditMode}
          setIsModalCancelOpen={setIsModalCancelOpen}
          setTitle={setTitle}
          title={title}
        />
      )}
    </StyledDiv>
  );
}

export default ComponentPreview;
