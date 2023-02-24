import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Container, Form, ContainerData } from "./styles";
import { socket } from "../../../utils/socket";
import { Button } from "../../layout/Button";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { IDevice, initialStateDevice } from "../../../interfaces/device";

export const UpdateDevice = ({
  onAction,
  deviceId,
}: {
  onAction: () => void;
  deviceId: string | null;
}) => {
  const [deviceReceived, setDeviceReceived] = useState<IDevice>();
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
      const response = await api.post("/device", device);
      socket.emit("sendDevice", { _id: response?.data?.data?._id });
    } catch (error) {
      console.error(error);
    } finally {
      onAction();
      setDevice(initialStateDevice);
    }
  };

  const sendMessage = () => {
    socket.emit("sendAll", { message: "teste" });
  };

  useEffect(() => {
    getOne();
  }, [deviceId]);

  useEffect(() => {
    socket.on("receiveAll", (data) => {
      alert(data.message);
    });

    socket.on("receiveDevice", (data) => {
      console.log("device ", data);
      setDeviceReceived(data);
    });
  }, [socket]);

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
      {deviceReceived && (
        <ContainerData align="center" justify="center" direction="column">
          <h2>Last Record:</h2>
          <p>Name: {deviceReceived?.name}</p>
          <p>Description: {deviceReceived?.description!}</p>
          <p>Sensor Name: {deviceReceived?.sensor?.sensorName}</p>
          <p>Humidity: {deviceReceived?.sensor?.humidity}</p>
          <p>Temperature: {deviceReceived?.sensor?.temperature}</p>
        </ContainerData>
      )}
    </Container>
  );
};
