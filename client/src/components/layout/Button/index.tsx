import { FC } from "react";
import { IconType } from "react-icons/lib";

import { ButtonStyle } from "./styles";

interface IButtonProps {
  text?: string;
  primaryColor: string;
  backgroundColor: string;
  hoverColor: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  borderRadius?: string;
  iconHeight?: string;
  iconWidth?: string;
  cursor?: string;
  Icon?: IconType;
  onClick: React.MouseEventHandler;
}

export const Button: FC<IButtonProps> = ({
  text,
  backgroundColor,
  hoverColor,
  primaryColor,
  onClick,
  disabled,
  height,
  width,
  Icon,
  borderRadius,
  iconHeight,
  iconWidth,
  cursor,
}) => {
  return (
    <ButtonStyle
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      primaryColor={primaryColor}
      disabled={disabled}
      onClick={onClick}
      height={height}
      width={width}
      borderRadius={borderRadius}
      iconHeight={iconHeight}
      iconWidth={iconWidth}
      cursor={cursor}
    >
      {text ? text : Icon && <Icon />}
    </ButtonStyle>
  );
};
