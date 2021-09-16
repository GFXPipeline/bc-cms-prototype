import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid #707070;
  display: flex;
  flex-direction: row;
  min-height: 46px;
  overflow-x: auto;
  width: 100%;

  @media (max-width: 910px) {
    min-height: 64px;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: #3f3f3f;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  min-height: 44px;
  padding: 0 35px;

  &.active {
    background-color: #3f3f3f;
    color: white;

    &:hover {
      background-color: #6f6f6f;
    }
  }

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 1145px) {
    padding: 0 15px;
  }
`;

function NavTabs({ tabs, currentTab, setCurrentTab }) {
  return (
    <StyledDiv>
      {tabs?.map((tab, index) => {
        return (
          <Tab
            key={`tab-${index}`}
            onClick={() => setCurrentTab(tab?.id)}
            className={tab?.id === currentTab && "active"}
            disabled={tab?.disabled || false}
          >
            {tab?.label}
          </Tab>
        );
      })}
    </StyledDiv>
  );
}

export default NavTabs;
