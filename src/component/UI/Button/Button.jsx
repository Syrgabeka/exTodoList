import styled from "styled-components";
import PropTypes from "prop-types";

function Button({ onClick, children, value }) {
  return (
    <ButtonStyled onClick={onClick} value={value}>
      {children}
    </ButtonStyled>
  );
}

export default Button;

const ButtonStyled = styled.button`
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 10px;
  color: ${(props) => (props.children === "AddTask" ? "#4d0084" : "white")};
  border: none;
  background-color: ${(props) =>
    props.children === "AddTask" ? "white" : "#4d0084"};
`;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  value: PropTypes.string,
};
