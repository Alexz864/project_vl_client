import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
