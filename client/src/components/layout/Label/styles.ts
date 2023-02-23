import styled from "styled-components";

interface IContainerLabelProps {
  primaryColor: string;
  backgroundColor: string;
  hoverColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  gap?: string;
  iconColor?: string;
  iconHeight?: string;
  iconWidth?: string;
}

interface ILabelProps {
  fontSize?: string;
}

export const Container = styled.div<IContainerLabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${(props) => props?.gap || "0.5rem"};

  border-style: none;
  border-width: 0px;
  border-radius: ${(props) => props?.borderRadius || "0.3rem"};

  color: ${(props) => props?.primaryColor};
  background-color: ${(props) => props?.backgroundColor};
  padding: 1rem;
  width: ${(props) => props?.width || "150px"};
  height: ${(props) => props?.height || "35px"};

  > svg {
    color: ${(props) => props?.iconColor};
    height: 25px;
    width: 25px;
  }
  &:hover {
    background-color: ${(props) => props?.hoverColor};
  }
`;

export const LabelStyle = styled.label<ILabelProps>`
  font-size: ${(props) => props?.fontSize || "1rem"};
`;
