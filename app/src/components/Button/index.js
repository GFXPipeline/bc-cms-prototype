import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? "#3e3e3e" : "white")};
  border-radius: 0px;
  border: 2px solid #3e3e3e;
  color: ${(props) => (props.primary ? "white" : "#313132")};
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  min-height: 44px;
  padding: 0 26px;
  text-align: center;
  text-decoration: none;

  &:disabled,
  &[disabled] {
    background-color: ${(props) => (props.primary ? "#6f6f6f" : "white")};
    border-color: #6f6f6f;
    color: ${(props) => (props.primary ? "white" : "#6f6f6f")};
    cursor: not-allowed;
  }

  &:hover {
    background-color: #6f6f6f;
    color: white;
    text-decoration: underline;

    &:disabled,
    &[disabled] {
      background-color: ${(props) => (props.primary ? "#7f7f7f" : "white")};
      border-color: #7f7f7f;
      color: ${(props) => (props.primary ? "white" : "#6f6f6f")};
      text-decoration: none;
    }
  }
`;

function Button({ children, className, disabled, ...props }) {
  return (
    <StyledButton
      type="button"
      className={className}
      disabled={disabled}
      {...props}
      // Don't explicitly list `primary` prop here, as styled-components will
      // only read it off of the `props` object.
    >
      {children}
    </StyledButton>
  );
}

export default Button;
