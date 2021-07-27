import { Link, NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

import { authenticationService } from "../../_services";

const Container = styled.div`
  background-color: #222222;
  border-bottom: 20px solid #333333;
  top: 0;
  width: 100%;

  a#link-home {
    color: #4d90fe;
    font-size: 26px;
    font-weight: 700;
    padding: 15px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  a#link-user-profile {
    color: white;
    padding: 15px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TopControls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 30px;
`;

const BottomControls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  margin: 0 30px;

  a {
    color: #9d9d9d;
    padding: 15px;
    text-decoration: none;

    &.active {
      text-decoration: underline;
    }

    &:hover {
      color: white;
    }
  }

  button {
    background: none;
    border: none;
    color: #9d9d9d;
    cursor: pointer;
    font-size: 16px;
    padding: 15px;

    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
`;

function Header() {
  let history = useHistory();

  return (
    <Container>
      <TopControls>
        <Link id="link-home" to="/">
          CMS
        </Link>
        <Link id="link-user-profile">
          {authenticationService.currentUserValue.username}
        </Link>
      </TopControls>
      <BottomControls>
        <NavLink activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/content">
          Content
        </NavLink>
        <NavLink activeClassName="active" to="/assets">
          Assets
        </NavLink>
        <NavLink activeClassName="active" to="/search">
          Enhanced Search
        </NavLink>
        <NavLink activeClassName="active" to="/form-builder">
          Form Builder
        </NavLink>
        <NavLink activeClassName="active" to="/taxonomy">
          Taxonomy
        </NavLink>
        <NavLink activeClassName="active" to="/tags">
          Tags
        </NavLink>
        <NavLink activeClassName="active" to="/groups">
          Groups
        </NavLink>
        <NavLink activeClassName="active" to="/users">
          Users
        </NavLink>
        <NavLink activeClassName="active" to="/admin">
          Admin
        </NavLink>
        <NavLink activeClassName="active" to="/reports">
          Reports
        </NavLink>
        <NavLink activeClassName="active" to="/help">
          Help
        </NavLink>
        <button
          onClick={() => {
            authenticationService.logout();
            history.push("/");
          }}
        >
          Logout
        </button>
      </BottomControls>
    </Container>
  );
}

export default Header;
