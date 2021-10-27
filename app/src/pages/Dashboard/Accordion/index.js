import styled from "styled-components";

import Icon from "../../../components/Icon";

const StyledDiv = styled.div`
  margin: 18px 0;
  width: 100%;

  div.label {
    background-color: #d7d7d7;
    display: flex;
    flex-direction: row;

    div.grip {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 44px;
    }

    svg {
      width: 18px;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      min-height: 44px;
    }

    button.label {
      flex-grow: 1;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
    }

    button.pin {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 44px;
    }

    button.arrow {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 44px;
    }
  }

  div.body {
    &.closed {
      display: none;
    }
  }
`;

function Accordion({ children, disabled, label, open, setOpen }) {
  return (
    <StyledDiv>
      <div className="label">
        <div className="grip">
          <Icon id="fa-grip-vertical.svg" />
        </div>
        <button
          className="label"
          onClick={() => setOpen(!open)}
          disabled={disabled}
        >
          {label}
        </button>
        <button className="pin" disabled={disabled}>
          <Icon id="noun-pushpin.svg" />
        </button>
        <button
          className="button"
          onClick={() => setOpen(!open)}
          disabled={disabled}
        >
          {open ? (
            <Icon id={"ionic-ios-arrow-up.svg"} />
          ) : (
            <Icon id={"ionic-ios-arrow-down.svg"} />
          )}
        </button>
      </div>
      <div className={open ? "body open" : "body closed"}>{children}</div>
    </StyledDiv>
  );
}

export default Accordion;
