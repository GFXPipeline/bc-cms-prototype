import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  font-size: 16px;
  max-width: 465px;
  opacity: 1 !important;

  div {
    max-height: 340px;
    overflow-y: auto;
    padding: 8px 21px;
  }
`;

function PickTemplateInfoBox() {
  return (
    <StyledDiv>
      <div>
        <h2>Page templates</h2>
        <p>
          To streamline content creation, input your content in designated page
          templates and avoid having to format the page yourself. See Page
          Templates in the Guide.
        </p>
        <strong>Base Template</strong>
        <p>The generic page template used for most government topic pages</p>
        <strong>Service Template</strong>
        <p>
          Used to build out a step-by-step or transactional service or program
        </p>
        <strong>Theme page template</strong>
        <p>Used to build a theme page</p>
        <strong>Search Results Page Template</strong>
        <p>Used to link a search to a results page</p>
        <strong>Forms Template</strong>
        <p>Used to create a form</p>
      </div>
    </StyledDiv>
  );
}

export default PickTemplateInfoBox;
