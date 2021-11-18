import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid #707070;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: #3f3f3f;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  height: 44px;
  padding: 0 18px;

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

  @media (max-width: 1500px) {
    padding: 0 12px;
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
