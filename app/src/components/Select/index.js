import styled from "styled-components";

const StyledSelect = styled.select`
  border: 2px solid #3e3e3e;
  cursor: pointer;
  height: 44px;
  padding: 0 26px 0 10px;
  width: 100%;
`;

function Select({ id, name, options, disabled, ...props }) {
  return (
    <StyledSelect id={id} name={name} disabled={disabled} {...props}>
      {Array.isArray(options) &&
        options?.length > 0 &&
        options.map((option, index) => {
          return (
            <option key={`select-${id}-option-${index}`} value={option?.value}>
              {option?.label}
            </option>
          );
        })}
    </StyledSelect>
  );
}

export default Select;