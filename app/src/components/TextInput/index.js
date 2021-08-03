import styled from "styled-components";

const StyledTextInput = styled.input`
  border-radius: 0px;
  border: 2px solid #3e3e3e;
  height: 44px;
  padding: 4px;
  width: 100%;
`;

function TextInput({ children, disabled, ...props }) {
  return (
    <StyledTextInput type="text" disabled={disabled} {...props}>
      {children}
    </StyledTextInput>
  );
}

export default TextInput;