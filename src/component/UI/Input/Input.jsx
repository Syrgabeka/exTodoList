import styled from "styled-components";
import PropTypes from "prop-types";

function Input({ type, value, onChange, placeholder }) {
  return (
    <InputStyled
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;

const InputStyled = styled.input`
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 10px;
`;

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};
