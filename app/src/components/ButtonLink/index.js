import styled from "styled-components";

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &:disabled {
    cursor: not-allowed;
    text-decoration: underline;
  }
`;

function ButtonLink({ children, className, disabled, ...props }) {
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

export default ButtonLink;
