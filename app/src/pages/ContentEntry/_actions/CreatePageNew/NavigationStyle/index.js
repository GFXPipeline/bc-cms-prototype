import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px;

  h3 {
    font-size: 30px;
    margin-top: 0px;
  }
`;

function NavigationStyle({
  availableNavStyles,
  isError,
  isLoading,
  navStyle,
  setNavStyle,
}) {
  return (
    <StyledDiv>
      <h3>Navigation style</h3>
      <p>
        Choose a navigation style. The navigation style shows how the children
        pages will be displayed.
      </p>
    </StyledDiv>
  );
}

export default NavigationStyle;
