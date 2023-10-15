import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "./Button.js";

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}
