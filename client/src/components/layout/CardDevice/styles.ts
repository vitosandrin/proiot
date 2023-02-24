import styled from "styled-components";
import { FlexBox } from "../../utils/Flexbox";

export const Container = styled(FlexBox)`
  text-align: center;
  padding: 1rem;
  margin: 1rem;
  overflow=y: auto;
  min-width: 250px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.types.water};
  & > h2 {
    font-size: 1.1rem;
    font-weight: bold;
  }

  & > p {
    font-size: 0.8rem;
    margin-bottom: 4px;
  }
`;
