import styled from "styled-components";

import Icon from "../../../components/Icon";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;

  button {
    align-items: center;
    background-color: white;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 28px;
    width: 250px;

    span {
      font-size: 18px;
      font-weight: 700;
      margin-top: 16px;
    }

    svg {
      height: 75px;
      width: 80px;
    }

    &.active {
      background-color: #d7d7d7;
    }

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      text-decoration: none;
    }
  }
`;

function Navigation({ section, setSection }) {
  return (
    <StyledDiv>
      <button
        className={section === "dashboard" ? "active" : null}
        onClick={() => setSection("dashboard")}
      >
        <Icon id="metro-files-empty.svg" />
        <span>My dashboard</span>
      </button>
      <button
        className={section === "analytics" ? "active" : null}
        onClick={() => setSection("analytics")}
        disabled
      >
        <Icon id="fa-chart-line.svg" />
        <span>Analytics</span>
      </button>
      <button
        className={section === "content-maintenance" ? "active" : null}
        onClick={() => setSection("content-maintenance")}
      >
        <Icon id="fa-tools.svg" />
        <span>Content maintenance</span>
      </button>
      <button
        className={section === "workflow-status" ? "active" : null}
        onClick={() => setSection("workflow-status")}
        disabled
      >
        <Icon id="fa-cycle.svg" />
        <span>Workflow status</span>
      </button>
      <button
        className={section === "users-and-groups" ? "active" : null}
        onClick={() => setSection("users-and-groups")}
        disabled
      >
        <Icon id="fa-user.svg" />
        <span>Users and groups</span>
      </button>
    </StyledDiv>
  );
}

export default Navigation;
