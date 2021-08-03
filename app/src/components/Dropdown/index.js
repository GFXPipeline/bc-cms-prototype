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

  div {
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
    }
  }
`;

function Dropdown({ id, label, options }) {
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
    <StyledDiv ref={ref}>
      <button
        id={id}
        className="toggle"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <span className="caret">{open ? "▲" : "▼"}</span>
      </button>
      <div aria-labelledby={id} className={open ? "open" : null}>
        {options?.length > 0 &&
          options.map((option, index) => {
            return (
              <button
                key={`dropdown-${id}-option-${index}`}
                className="option"
                onClick={() => {
                  option?.action();
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            );
          })}
      </div>
    </StyledDiv>
  );
}

export default Dropdown;
