import styled from "styled-components";

const StyledSelect = styled.select`
  border: 2px solid #3e3e3e;
  cursor: pointer;
  height: 44px;
  padding: 0 26px 0 10px;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
  }
`;

function Select({ id, name, options, value, onChange, disabled, ...props }) {
  return (
    <StyledSelect
      id={id}
      name={name}
      disabled={disabled}
      onChange={onChange ? (e) => onChange(e.target.value) : null}
      value={value || ""}
      {...props}
    >
      {Array.isArray(options) &&
        options?.length > 0 &&
        options.map((option, index) => {
          return (
            <option
              key={`select-${id}-option-${index}`}
              value={option?.value}
              disabled={option?.disabled}
            >
              {option?.label}
            </option>
          );
        })}
    </StyledSelect>
  );
}

export default Select;
