import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Container, Form } from "./styles";
import { socket } from "../../../utils/socket";
import { Button } from "../../layout/Button";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { IDevice, IDeviceInfo } from "../../../interfaces/device";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export const UpdateDevice = ({
  onAction,
  deviceId,
}: {
  onAction: () => void;
  deviceId: string | null;
}) => {
  const [device, setDevice] = useState<IDevice | undefined>(undefined);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await api.patch(`/device/${deviceId}`, device);
    } catch (error) {
      console.error(error);
    } finally {
      onAction();
      socket.emit("sendDevices");
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
        </Container>
      );
    });
  };

  const getOne = async () => {
    const result = await api.get(`/device/${deviceId}`);
    setDevice(result?.data?.data);
  };

  useEffect(() => {
    getOne();
  }, [deviceId]);

  return (
    <Container gap="xs" align="center" justify="center" direction="column">
      <h1>Update a device:</h1>
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
        <Form gap="xs" align="center" justify="center" direction="row">
          {renderForms()}
        </Form>
      </Form>
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Update"
        onClick={handleSubmit}
      />
    </Container>
  );
};
