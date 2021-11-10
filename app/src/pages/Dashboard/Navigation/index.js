import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Icon from "../../../components/Icon";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;

  a {
    align-items: center;
    background-color: white;
    border: none;
    color: #313132;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 28px;
    text-decoration: none;
    width: 250px;

    span {
      font-size: 18px;
      font-weight: 700;
      margin-top: 16px;
      text-align: center;
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
  }
`;

function Navigation() {
  return (
    <StyledDiv>
      <NavLink activeClassName="active" to="/dashboard">
        <Icon id="metro-files-empty.svg" />
        <span>My dashboard</span>
      </NavLink>
      <NavLink activeClassName="active" to="/analytics">
        <Icon id="fa-chart-line.svg" />
        <span>Analytics</span>
      </NavLink>
      <NavLink activeClassName="active" to="/content-maintenance">
        <Icon id="fa-tools.svg" />
        <span>Content maintenance</span>
      </NavLink>
      <NavLink activeClassName="active" to="/workflow-status">
        <Icon id="fa-cycle.svg" />
        <span>Workflow status</span>
      </NavLink>
      <NavLink activeClassName="active" to="/users-and-groups">
        <Icon id="fa-user.svg" />
        <span>Users and groups</span>
      </NavLink>
    </StyledDiv>
  );
}

export default Navigation;
