import { useState } from "react";
import { Container, Form } from "./styles";
import { socket } from "../../../utils/socket";
import { Button, Input } from "../../../components";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { IDevice, IDeviceInfo } from "../../../interfaces/device";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export const NewDevice = ({
  handleCreateClick,
}: {
  handleCreateClick: () => void;
}) => {
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await api.post("/device", device);
    } catch (error) {
      console.error(error);
    } finally {
      handleCreateClick();
      socket.emit("sendDevices");
      setDevice(undefined);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setDevice((prevState: any) => {
      const newInfo = prevState.info ? [...prevState.info] : [];
      newInfo[index] = {
        ...newInfo[index],
        [e.target.name]: e.target.value,
      };
      return { ...prevState, info: newInfo };
    });
  };

  const handleAddForm = () => {
    setDevice((prevState: any) => {
      const newInfo = prevState?.info ? [...prevState.info] : [];
      newInfo.push({ type: "", value: 0, unit: "" });
      return { ...prevState, info: newInfo };
    });
  };

  const handleRemoveForm = (index: number) => {
    const info = [...device?.info!];
    info.splice(index, 1);
    setDevice({ name: device?.name!, info: info });
  };

  const renderForms = () => {
    return device?.info?.map((item: IDeviceInfo, index: number) => {
      return (
        <Container
          gap="xxxs"
          align="center"
          justify="center"
          direction="column"
          key={index}
        >
          <Input
            primaryColor={theme?.font?.colors?.dark}
            fontSize="0.6rem"
            text="Type"
            type="text"
            name="type"
            width="100px"
            value={item.type || ""}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, index)
            }
          />
          <Input
            primaryColor={theme?.font?.colors?.dark}
            fontSize="0.6rem"
            text="Unit"
            type="text"
            name="unit"
            width="100px"
            value={item.unit || ""}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, index)
            }
          />
          <Input
            primaryColor={theme?.font?.colors?.dark}
            fontSize="0.6rem"
            text="Value"
            type="number"
            name="value"
            width="100px"
            value={item.value || ""}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, index)
            }
          />
          <Button
            Icon={FaMinusSquare}
            onClick={() => handleRemoveForm(index)}
            width="28px"
            height="28px"
            iconHeight="24px"
            iconWidth="24px"
            primaryColor={theme?.font?.colors?.dark}
            hoverColor={theme?.colors?.dark?.pure}
            backgroundColor={theme?.colors?.background}
          />
        </Container>
      );
    });
  };

  return (
    <Container gap="xs" align="center" justify="center" direction="column">
      <h1>Create a device:</h1>
      <Form align="center" justify="center" direction="column">
        <Input
          text="Name"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="text"
          name="name"
          value={device?.name || ""}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDevice((prevDevice: any) => ({
              ...prevDevice!,
              name: e.target.value,
            }))
          }
        />
        <Button
          Icon={FaPlusSquare}
          onClick={handleAddForm}
          width="28px"
          height="28px"
          iconHeight="24px"
          iconWidth="24px"
          disabled={device?.info?.length === 3}
          primaryColor={theme?.font?.colors?.dark}
          hoverColor={theme?.colors?.dark?.pure}
          backgroundColor={theme?.colors?.background}
        />
        <Form gap="xs" align="center" justify="center" direction="row">
          {renderForms()}
        </Form>
      </Form>
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Create"
        onClick={handleSubmit}
      />
    </Container>
  );
};
