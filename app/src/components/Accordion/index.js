import styled from "styled-components";

import Icon from "../Icon";

const StyledDiv = styled.div`
  display: block;
`;

const AccordionHeader = styled.div`
  background-color: white;
  display: block;
  button {
    align-items: center;
    background: none;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid #707070;
    border-left: none;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    min-height: 44px;
    padding: 13px 16px;
    width: 100%;

    svg {
      display: inline-block;
      width: 14px;
    }
  }
`;

const AccordionBody = styled.div`
  background-color: white;

  &.closed {
    display: none;
  }

  &.open {
    display: block;
  }
`;

function Accordion({
  children,
  id,
  label,
  open = false,
  toggleOpen,
  ...props
}) {
  return (
    <StyledDiv id={id} {...props}>
      <AccordionHeader>
        <button
          onClick={toggleOpen}
          aria-controls={`accordion-body-${id}`}
          aria-expanded={open ? true : false}
        >
          {label}
          {open ? (
            <Icon id={"ionic-ios-arrow-up.svg"} />
          ) : (
            <Icon id={"ionic-ios-arrow-down.svg"} />
          )}
        </button>
      </AccordionHeader>
      <AccordionBody
        className={open ? "open" : "closed"}
        id={`accordion-body-${id}`}
        aria-labelledby={`accordion-label-${id}`}
        role="region"
      >
        {children}
      </AccordionBody>
    </StyledDiv>
  );
}

export default Accordion;
