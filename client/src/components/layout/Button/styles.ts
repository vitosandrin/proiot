import styled from "styled-components";

interface IButtonStyleProps {
  primaryColor: string;
  backgroundColor: string;
  hoverColor: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  iconHeight?: string;
  iconWidth?: string;
  cursor?: string;
}

export const ButtonStyle = styled.button<IButtonStyleProps>`
  cursor: ${(props) => props?.cursor || "pointer"};

  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;

  padding: 0.2rem;
  border-style: none;
  border-width: 0px;
  border-radius: ${(props) => props?.borderRadius || "0.3rem"};

  color: ${(props) => props?.primaryColor};
  background-color: ${(props) => props?.backgroundColor};

  width: ${(props) => props?.width || "170px"};
  height: ${(props) => props?.height || "35px"};

  &:hover {
    background-color: ${(props) => props?.hoverColor};
  }

  > svg {
    height: ${(props) => props?.iconHeight || "12px"};
    width: ${(props) => props?.iconWidth || "12px"};
  }
`;
