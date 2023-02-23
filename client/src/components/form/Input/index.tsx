import { Label, Form, InputStyle } from "./styles";
import { FC } from "react";

interface IInputProps {
  type: string;
  text?: string;
  name?: string;
  placeholder?: string;
  handleOnChange?: React.ChangeEventHandler;
  value?: string | number;
  primaryColor: string;
  fontSize: string;
  height?: string;
  width?: string;
}

export const Input: FC<IInputProps> = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  primaryColor,
  fontSize,
  height,
  width,
}) => {
  return (
    <Form>
      <Label htmlFor={name} fontSize={fontSize} primaryColor={primaryColor}>
        {text}:
      </Label>
      <InputStyle
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        width={width}
        height={height}
      />
    </Form>
  );
};
