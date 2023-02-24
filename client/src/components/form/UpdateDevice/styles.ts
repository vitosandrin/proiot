import styled from "styled-components";
import { FlexBox } from "../../utils/Flexbox";

export const Container = styled(FlexBox)`
  margin-top: 1rem;
  padding: 1rem;
  width: 300px;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerData = styled(FlexBox)`
  width: 300px;
`;
export const Form = styled(FlexBox)``;
