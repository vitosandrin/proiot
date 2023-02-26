import styled from "styled-components";
import { FlexBox } from "../../utils/Flexbox";

export const Container = styled(FlexBox)`
  padding: 1rem;
  text-align: center;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled(FlexBox)`
  overflow-x: auto;
`;
