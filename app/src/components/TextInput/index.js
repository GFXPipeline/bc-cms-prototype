import styled from "styled-components";

const StyledTextInput = styled.input`
  background-color: white;
  border-radius: 0px;
  border: 2px solid #3e3e3e;
  font-size: 16px;
  height: 44px;
  padding: 4px;
  width: 100%;

  &:disabled {
    border-color: #6f6f6f;
    background-color: #f9f9f9;

    &:hover {
      cursor: not-allowed;
    }
  }
`;

function TextInput({ children, disabled, ...props }) {
  return (
    <StyledTextInput type="text" disabled={disabled} {...props}>
      {children}
    </StyledTextInput>
  );
}

export default TextInput;
