import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  button.toggle {
    background: none;

    span.caret {
      font-size: 10px;
      margin-left: 3px;
    }
  }
`;

const DropdownBody = styled.div`
  display: none;
  position: absolute;
  z-index: 1;

  &.open {
    align-items: flex-start;
    background-color: white;
    border: 1px solid #3f3f3f;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
  }

  button.option {
    background: none;

    &:disabled {
      cursor: not-allowed;
      color: #c3c3c3;
    }
  }
`;

function DropdownPanel({
  buttonAriaLabel,
  buttonContent,
  children,
  disabled = false,
  id,
  isCaretShown,
  ...props
}) {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  function handleClickOutside(event) {
    if (ref.current.contains(event.target)) {
      // Inside click
      return;
    }
    // Outside click
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <StyledDiv ref={ref} {...props}>
      <button
        id={id}
        className="toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={buttonAriaLabel}
        onClick={() => setOpen(!open)}
        disabled={disabled}
      >
        {buttonContent}
        {isCaretShown && <span className="caret">{open ? "▲" : "▼"}</span>}
      </button>
      <DropdownBody aria-labelledby={id} className={open ? "open" : null}>
        {children}
      </DropdownBody>
    </StyledDiv>
  );
}

export default DropdownPanel;
