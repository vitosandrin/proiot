import { FC } from "react";
import { IconType } from "react-icons/lib";
import { Container, LabelStyle } from "./styles";

interface ILabelProps {
  text?: string;
  primaryColor: string;
  backgroundColor: string;
  hoverColor?: string;
  height?: string;
  width?: string;
  fontSize?: string;
  borderRadius?: string;
  gap?: string;
  Icon?: IconType;
  onClick?: React.MouseEventHandler;
  iconColor?: string;
}

export const Label: FC<ILabelProps> = ({
  text,
  backgroundColor,
  hoverColor,
  primaryColor,
  onClick,
  height,
  width,
  Icon,
  borderRadius,
  fontSize,
  gap,
  iconColor,
}) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      primaryColor={primaryColor}
      onClick={onClick}
      height={height}
      width={width}
      gap={gap}
      borderRadius={borderRadius}
      iconColor={iconColor}
    >
      {Icon && <Icon />}
      {text && <LabelStyle fontSize={fontSize}>{text}</LabelStyle>}
    </Container>
  );
};
