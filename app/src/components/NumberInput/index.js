import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 0px;
  border: 2px solid #3e3e3e;
  height: 44px;
  padding: 4px;

  &:disabled {
    border-color: #6f6f6f;
    color: #808080;
    cursor: not-allowed;
  }
`;

function NumberInput({ min, max, value, ...props }) {
  return (
    <StyledInput type="number" min={min} max={max} value={value} {...props} />
  );
}

export default NumberInput;
