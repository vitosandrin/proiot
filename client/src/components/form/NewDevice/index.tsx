import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Container, Form } from "./styles";
import { socket } from "../../../utils/socket";
import { Button } from "../../layout/Button";
import { theme } from "../../../theme";
import { api } from "../../../utils/axios";
import { IDevice, initialStateDevice } from "../../interfaces/device";

export const NewDevice = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState<any>({});
  const [room, setRoom] = useState("");
  const [device, setDevice] = useState<IDevice>(initialStateDevice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await api.post("/device", device);
    } catch (error) {
      console.error(error);
    } finally {
      // onAction();
      // setDevice(initialStateDevice);
    }
  };

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("joinRoom", room);
  //   }
  // };

  const sendMessage = () => {
    socket.emit("sendDevice");
  };

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on("test", (data: any) => {
      console.log(data);
    });

    socket.on("receiveDevice", (data: any) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, []);

  console.log(messageReceived);
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
          value={device?.sensorName || ""}
          handleOnChange={handleChange}
        />

        <Input
          text="Temperature"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="number"
          name="temperature"
          value={device?.temperature || ""}
          handleOnChange={handleChange}
        />

        <Input
          text="Humidity"
          fontSize="0.7rem"
          primaryColor={theme.font.colors.dark}
          type="number"
          name="humidity"
          value={device?.humidity || ""}
          handleOnChange={handleChange}
        />
      </Form>
      <Button
        hoverColor={theme.colors.neutral[1]}
        backgroundColor={theme.colors.neutral.pure}
        primaryColor={theme.font.colors.white}
        text="Create"
        onClick={sendMessage}
      />
      <></>
    </Container>
  );
};
