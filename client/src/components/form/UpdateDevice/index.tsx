import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Container, Form } from "./styles";
import { socket } from "../../../utils/socket";
import { Button } from "../../layout/Button";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { IDevice } from "../../../interfaces/device";

export const UpdateDevice = ({
  onAction,
  deviceId,
}: {
  onAction: () => void;
  deviceId: string | null;
}) => {
  const [device, setDevice] = useState<IDevice>();

  const getOne = async () => {
    const result = await api.get(`/device/${deviceId}`);
    setDevice(result?.data?.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

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
          handleOnChange={handleChange}
        />
        <Input
          text="Short description"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="text"
          name="description"
          value={device?.description || ""}
          handleOnChange={handleChange}
        />
        <Input
          text="Sensor"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="text"
          name="sensorName"
          value={device?.sensor?.sensorName || ""}
          handleOnChange={handleChange}
        />

        <Input
          text="Temperature"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="number"
          name="temperature"
          value={parseFloat(device?.sensor?.temperature!) || ""}
          handleOnChange={handleChange}
        />

        <Input
          text="Humidity"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="number"
          name="humidity"
          value={parseFloat(device?.sensor?.humidity!) || ""}
          handleOnChange={handleChange}
        />
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
